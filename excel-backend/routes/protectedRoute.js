var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import User from "../models/User.js";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();
router.get('/user', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.user, 'req.user');
        const user = yield User.findOne({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        console.log(user, 'user');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error, 'error');
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
export default router;
