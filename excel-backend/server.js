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
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import protectedRoute from './routes/protectedRoute.js';
import spreadsheetRoute from "./routes/spreadsheet.js";
import cors from 'cors';
import mongoose from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "./swaggerOptions.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();
((() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB🔥');
    // hide from hackers what stack we use
    app.disable('x-powered-by');
    app.use(cors({
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200,
        credentials: true
    }));
    app.use(express.json());
    app.use('/auth', authRoute);
    app.use('/protected', protectedRoute);
    app.use('/spreadsheet', spreadsheetRoute);
    const specs = swaggerJsdoc(options);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
    app.listen(PORT, () => {
        console.log(`⚡ Server running on port ${PORT}`);
    });
}))());
