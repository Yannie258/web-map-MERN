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

