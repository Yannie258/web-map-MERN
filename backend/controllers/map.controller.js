import express from 'express';
import { find } from '../models/Categories.model.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export async function getAllCategories(req, res) {
    try {
        const allCategories = await find();
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json(error);
    }
}


