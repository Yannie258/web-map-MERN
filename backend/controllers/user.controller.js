import User, { findOne, findById, findByIdAndUpdate, find, findByIdAndDelete } from '../models/Users.model';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const privateKey = process.env.JWT_SECRETE_KEY;

export async function createUser(req, res) {
    try {
        // Check if the user already exists
        const existingUser = await findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        //generate new password
        const salt = await genSalt(10);
        const hashedPassword = await hash(req.body.password, salt);
        //create new user
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        })

        //save user and send response
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'An internal server serror occurred: ', error: err.message });
    }
}

export async function userLogin(req, res) {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await findOne({ email });
        if (!user) return res.status(401).json('User not found');

        // Validate password
        const validPassword = await compare(password, user.password);
        if (!validPassword) return res.status(401).json('Incorrect password');

        // Generate token
        const token = sign({
            email: user.email,
            id: user._id,
            userName: user.userName
        }, privateKey, { expiresIn: '1h' }); // this session cookies expires in 1h, after 1h user is automatically logout and has to refresh the page by logging again

        // Set cookie
        res.cookie('token', token).status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'An internal server serror occurred: ', error: err.message });
    }

}

export async function getUserProfile(req, res) { 
    const { token } = req.cookies;
    if (token) {
        try {
             //decrypt the token
            await verify(token, process.env.JWT_SECRETE_KEY, {}, async (err, data) => {
                if (err) throw err;
                const { userName, email, _id, homeAddress, favourite } = await findById(data.id);
                res.json({ userName, email, _id, homeAddress, favourite });
            });
        } catch (err) {
            // Handle token errors
            if (err.name === 'TokenExpiredError') {
                // Handle token expiration
                res.status(401).json({ message: 'Token expired, please log in again' });
            } else {
                // Handle other token errors
                res.status(400).json({ message: 'Invalid token' });
            }
        }
       
    } else {
        res.json(null);
    }
}

export async function editUserAccount(req, res) { 
    await findByIdAndUpdate(req.params.id,req.body, { new: true })
      .then((updatedUser) => {
        if (updatedUser) {
          res.status(201).json(updatedUser) // Respond with the updated user
        } else {
          res.status(404).send('Person not found!')
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'An internal server serror occurred: ', error: err.message })
      })
}

export async function getAllUser(req,res){
    await find({})
        .then((persons) => {
            res.status(200).send(persons)
        })
    .catch((err)=>(res.status(500).send({ message: 'An internal server serror occurred: ', error: err.message })))
}

export async function getUser(req, res) {
    const { field, value } = req.params;
    try {
    // Check if a user with the given field value exists
    const user = await findOne({ [field]: value });

    // Return response indicating whether the user exists
    res.json({ exists: !!user }); // Send true if user exists, false otherwise
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'An internal server serror occurred: ', error: err.message });
  }
}

export async function getUserById(req, res) { 
    const { id } = req.params;
    try {
        const user = await findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'An internal server serror occurred: ', error: err.message });
    }
}

export async function userLogOut(req,res){
     try {
    // Clear the cookie
    await res.clearCookie('token');
    res.status(200).send({ message: 'Successfully logged out' });
  } catch (error) {
    res.status(500).send({ message: 'An internal server serror occurred: ', error: err.message });
  }
}

export async function deleteUser(req, res) {
    try {
        const deletedUser = await findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User account deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        res.status(500).send({ message: 'An internal server serror occurred: ', error: err.message });
    }
}

export async function removeHome(req, res) {
    try {
        const userId = req.params.id;
        const user = await findByIdAndUpdate(
        userId,
        { $unset: { homeAddress: 1 } },
        { new: true }
        );

        if (!user) {
        return res.status(404).send('User not found');
        }

        res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ message: 'An internal server serror occurred: ', error: err.message });
  }
}

export async function removeFavourite(req, res) {
    try {
        const userId = req.params.id;
        const user = await findByIdAndUpdate(
        userId,
        { $unset: { favourite: 1 } },
        { new: true }
        );

        if (!user) {
        return res.status(404).send('User not found');
        }

        res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: 'An internal server serror occurred: ', error: err.message });
  }
}


