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
        const token = jwt.sign({ email: user.email, id: user._id }, privateKey, { expiresIn: '1h' });

        // Set cookie
        res.cookie('token', token);

        // Send response
        res.status(200).json({ message: 'User login successful', token, user });
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }

}

exports.getUserProfile = async (req, res) => { 
    const { userName, email, password } = req.body;
     try {
        //find user
        const user = await User.findOne({ email})
        if (!user) return res.status(400).json('User not found or Password is wrong');

        //validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        //const validPassword= await User.findOne({password})//not secure password
        if (!validPassword) return res.status(400).json('User not found or Password is wrong');

        //send res
        res.status(200).json(user);
    
  } catch (err) {
    res.status(500).json('Access profile error', err)
  }
}

exports.getUser = (req,res)=>{
    User.find({})
        .then((persons) => {
            res.status(200).send(persons)
        })
    .catch((err)=>(res.status(500).send(err)))
}
