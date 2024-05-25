const User = require('../models/Users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const privateKey = process.env.JWT_SECRETE_KEY;

exports.createUser = async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //create new user
      const newUser = new User({
          userName: req.body.userName,
          email: req.body.email,
          password:  hashedPassword,
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
        }, privateKey, { expiresIn: '1h' });

        // Set cookie
        res.cookie('token', token).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }

}

exports.getUserProfile = (req, res) => { 
    const { token } = req.cookies;
    if (token) {
        //decrypt the token
        jwt.verify(token, process.env.JWT_SECRETE_KEY, {}, async(err, data) => { 
            if (err) throw err;
            const {userName, email,_id} = await User.findById(data.id)
            res.json({ userName, email, _id});
        })

    } else {
        res.json(null);
    }
}

exports.editUserProfile = (req, res) => { 
}

exports.getUser = (req,res)=>{
    User.find({})
        .then((persons) => {
            res.status(200).send(persons)
        })
    .catch((err)=>(res.status(500).send(err)))
}

exports.userLogOut =   (req,res)=>{
     try {
    // Invalidate the session by removing the session document from MongoDB


    // Clear the cookie
    res.clearCookie('token');
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging out' });
  }
}

exports.deleteUser = async (req,res,next)=>{
   try {
       await User.findOneAndDelete(req.params.userName);
       res.clearCookie('token');
       res.status(200).json('User deleted');

   } catch (error) {
    next(error)
   }
}
