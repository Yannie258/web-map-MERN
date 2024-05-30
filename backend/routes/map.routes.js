const express = require('express')
const router = express.Router()
const mapController = require('../controllers/map.controller')

router.get('/categories/all', mapController.getAllCategories);

module.exports = router
