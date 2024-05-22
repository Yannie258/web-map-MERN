const User = require('../models/Users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const privateKey = process.env.JWT_SECRETE_KEY;

exports.createUser = async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        })

        //save user and send response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json('Register error: ' + err);
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json('User not found');

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json('Incorrect password');

        // Generate token
        const token = jwt.sign({
            email: user.email,
            id: user._id,
            userName: user.userName
        }, privateKey, { expiresIn: '1h' }); // this session cookies expires in 1h, after 1h user is automatically logout and has to refresh the page by logging again

        // Set cookie
        res.cookie('token', token).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }

}

exports.getUserProfile = async (req, res) => { 
    const { token } = req.cookies;
    if (token) {
        try {
             //decrypt the token
            await jwt.verify(token, process.env.JWT_SECRETE_KEY, {}, async (err, data) => {
                if (err) throw err;
                const { userName, email, _id, homeAddress, favourite } = await User.findById(data.id);
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

exports.editUserAccount = async(req, res) => { 
    await User.findByIdAndUpdate(req.params.id,req.body, { new: true })
      .then((updatedUser) => {
        if (updatedUser) {
          res.status(200).json(updatedUser) // Respond with the updated user
        } else {
          res.status(404).send('Person not found!')
        }
      })
      .catch((err) => {
        res.status(500).send(err)
      })
}

exports.getAllUser = async (req,res)=>{
    await User.find({})
        .then((persons) => {
            res.status(200).send(persons)
        })
    .catch((err)=>(res.status(500).send(err)))
}

exports.getUser = async (req, res) => {
    const { field, value } = req.params;
    try {
    // Check if a user with the given field value exists
    const user = await User.findOne({ [field]: value });

    // Return response indicating whether the user exists
    res.json({ exists: !!user }); // Send true if user exists, false otherwise
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'Internal server error when get user data' });
  }
}

exports.getUserById = async (req, res) => { 
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'An internal server error occurred' });
    }
}

exports.userLogOut = async (req,res)=>{
     try {
    // Clear the cookie
    await res.clearCookie('token');
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging out' });
  }
}

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User account deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        res.status(500).send({ message: 'An internal server error occurred' });
    }
}

exports.updateHomeAdressForUser = async (req, res) => {
    const { id } = req.params;
    const { homeAdress } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { homeAdress }, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error updating address' });
    }
}

exports.updateFavouriteForUser = async (req, res) => {
     const { id } = req.params;
    const { favourite } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { favourite }, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error updating address' });
    }
}


