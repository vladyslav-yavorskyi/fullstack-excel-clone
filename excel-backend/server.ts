import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import protectedRoute from './routes/protectedRoute.js';
import spreadsheetRoute from "./routes/spreadsheet.js";
import cors from 'cors'
import mongoose from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "./swaggerOptions.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

((async () => {

    await mongoose.connect(MONGO_URI as string);
    console.log('Connected to MongoDB🔥');
// hide from hackers what stack we use
    app.disable('x-powered-by');
    app.use(cors({
        origin: 'http://localhost:5137',
        optionsSuccessStatus: 200,
        credentials: true
    }));
    app.use(express.json());
    app.use('/auth', authRoute);
    app.use('/protected', protectedRoute);
    app.use('/spreadsheet', spreadsheetRoute)

    const specs = swaggerJsdoc(options);
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );



    app.listen(PORT, () => {
        console.log(`⚡ Server running on port ${PORT}`);
    })
})());
