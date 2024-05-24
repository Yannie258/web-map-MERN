const express = require('express')
const router = express.Router()
// Controller import, could also be named import
const userController = require('../controllers/user.controller')

// CRUD endpoints and Methods(get,post,...) here
// --------READ----------------------------------------------------------------:
// localhost: 5000 / api / v1 / persons / all METHOD: GET - READ
router.post('/register', userController.createUser);
router.post('/login', userController.userLogin);

router.get('/test', userController.getUser);
// GET one person on Email
//router.get('/onEmail/:email', personController.onEmail)
//GET one person on id
//router.get('/:id', personController.onId)
//Create a new person - CREATE
//router.post('/createSinglePerson', personController.createPerson)
//UPDATE a person
//router.put('/updatePerson/:id', personController.updatePerson)
//DELETE a person
//router.delete('/deletePerson/:id', personController.deletePerson)
// * Endpoint as * Method error handling
//router.get('/*', personController.error)

// All routes export
module.exports = router
