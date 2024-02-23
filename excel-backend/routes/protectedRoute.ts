import express from 'express';
import { Request, Response } from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import User from "../models/User.js";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

interface UserPayload {
    _id?: string;
}

interface RequestWithUser extends Request {
    user?: UserPayload;
}

router.get('/user', verifyToken, async (req: RequestWithUser, res: Response) => {
    try {
        console.log(req.user, 'req.user')
        const user = await User.findOne({ _id: req.user?._id });
        console.log(user, 'user')
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error, 'error')
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;