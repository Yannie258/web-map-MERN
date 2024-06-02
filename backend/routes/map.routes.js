const express = require('express')
const router = express.Router()
const mapController = require('../controllers/map.controller')

router.get('/categories/all', mapController.getAllCategories);
router.get('/categories/point/detail/:prop/:value', mapController.getPoint);

module.exports = router
