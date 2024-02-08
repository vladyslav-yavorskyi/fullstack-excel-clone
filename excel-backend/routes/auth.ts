import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({error: "user not found"});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({error: "wrong password"});
        }
        const token = jwt.sign({_id: user._id}, TOKEN_SECRET as string);
        res.header('auth-token', token).json({token});
    } catch (error) {
        res.status(500).json({error: "login failed"});
    }
})

export default router;