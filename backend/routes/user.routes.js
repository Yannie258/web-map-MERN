const express = require('express')
const router = express.Router()
// Controller import, could also be named import
const userController = require('../controllers/user.controller')

// CRUD endpoints and Methods(get,post,...) here
// --------READ----------------------------------------------------------------:
// localhost: 5000 / api / v1 / persons / all METHOD: GET - READ
router.post('/users/register', userController.createUser);
router.post('/users/login', userController.userLogin);
router.post('/users/logout',userController.userLogOut);

router.get('/users/test', userController.getAllUser);
router.get('/users/check-user-exists/:field/:value', userController.getUser);
router.get('/users/profile', userController.getUserProfile); // get actual user profile, authenticate user base on token
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.editUserAccount);
router.delete('/users/:id',userController.deleteUser);

// All routes export
module.exports = router
