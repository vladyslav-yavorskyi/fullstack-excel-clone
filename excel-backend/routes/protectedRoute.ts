import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({message: "Welcome to the protected route"});
})

export default router;