const express = require('express');
const Categories = require('../models/Categories.model.js')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const privateKey = process.env.JWT_SECRETE_KEY;

exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await Categories.find();
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json(error);
    }
}
 
exports.getPoint = async (req, res) => { 
    const { prop, value } = req.params;
    try {
        // Check if a document with the given property and value exists
        const query = {};
        query[`properties.${prop}`] = value;
         console.log(`Constructed query:`, query);
    // Check if a data with the given field value exists
    const location = await Categories.findOne(query);

    // Return response indicating whether the data exists
    res.json({ exists: !!location, location }); // Send true if data exists, false otherwise
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'Internal server error when get user data' });
  }
}

