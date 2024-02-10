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
import Spreadsheet from '../models/Spreadsheet.js';
const router = express.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSpreadsheet = new Spreadsheet({
        title: "Untitled",
        lastOpen: Date.now(),
        dataState: new Map(),
        rowState: new Map(),
        colState: new Map(),
        stylesState: new Map()
    });
    try {
        const savedSpreadsheet = yield newSpreadsheet.save();
        res.status(200).json(savedSpreadsheet);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get('/:spreadsheetId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spreadsheets = yield Spreadsheet.find({ _id: req.params.spreadsheetId });
        res.status(200).json(spreadsheets);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put('/:spreadsheetId/cell/:cellId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spreadsheet = yield Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({ error: "Spreadsheet not found" });
        }
        // Update the cell data
        if (spreadsheet.dataState) {
            spreadsheet.dataState.set(req.params.cellId, req.body.data);
        }
        // Save the updated spreadsheet
        const updatedSpreadsheet = yield spreadsheet.save();
        res.status(200).json(updatedSpreadsheet);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put('/:spreadsheetId/col/:colId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spreadsheet = yield Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({ error: "Spreadsheet not found" });
        }
        // Update the column size
        if (spreadsheet.colState) {
            spreadsheet.colState.set(req.params.colId, req.body.size);
        }
        // Save the updated spreadsheet
        const updatedSpreadsheet = yield spreadsheet.save();
        res.status(200).json(updatedSpreadsheet);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put('/:spreadsheetId/row/:rowId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spreadsheet = yield Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({ error: "Spreadsheet not found" });
        }
        // Update the row size
        if (spreadsheet.rowState) {
            spreadsheet.rowState.set(req.params.rowId, req.body.size);
        }
        // Save the updated spreadsheet
        const updatedSpreadsheet = yield spreadsheet.save();
        res.status(200).json(updatedSpreadsheet);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put('/:spreadsheetId/title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spreadsheet = yield Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({ error: "Spreadsheet not found" });
        }
        // Update the title
        spreadsheet.title = req.body.title;
        // Save the updated spreadsheet
        const updatedSpreadsheet = yield spreadsheet.save();
        res.status(200).json(updatedSpreadsheet);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put('/:spreadsheetId/lastOpen', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spreadsheet = yield Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({ error: "Spreadsheet not found" });
        }
        // Update the lastOpen timestamp
        spreadsheet.lastOpen = req.body.lastOpen;
        // Save the updated spreadsheet
        const updatedSpreadsheet = yield spreadsheet.save();
        res.status(200).json(updatedSpreadsheet);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put('/:spreadsheetId/styles/:cellId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spreadsheet = yield Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({ error: "Spreadsheet not found" });
        }
        // Update the styles
        if (spreadsheet.stylesState) {
            spreadsheet.stylesState.set(req.params.cellId, req.body.styles);
        }
        // Save the updated spreadsheet
        const updatedSpreadsheet = yield spreadsheet.save();
        res.status(200).json(updatedSpreadsheet);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put('/:spreadsheetId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSpreadsheet = yield Spreadsheet.findByIdAndUpdate(req.params.spreadsheetId, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedSpreadsheet);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.delete('/:spreadsheetId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Spreadsheet.findByIdAndDelete({ _id: req.params.spreadsheetId });
        res.status(200).json("Spreadsheet has been deleted...");
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
export default router;
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new spreadsheet
 *     tags: [Spreadsheet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Spreadsheet'
 *     responses:
 *       200:
 *         description: The spreadsheet was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}:
 *   get:
 *     summary: Get a spreadsheet by ID
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The spreadsheet was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}:
 *   put:
 *     summary: Update a spreadsheet
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Spreadsheet'
 *     responses:
 *       200:
 *         description: The spreadsheet was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}:
 *   delete:
 *     summary: Delete a spreadsheet
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The spreadsheet was successfully deleted
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}/cell/{cellId}:
 *   put:
 *     summary: Update a cell in a spreadsheet
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: cellId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *     responses:
 *       200:
 *         description: The cell was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}/col/{colId}:
 *   put:
 *     summary: Update a column size in a spreadsheet
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: colId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: number
 *     responses:
 *       200:
 *         description: The column size was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}/row/{rowId}:
 *   put:
 *     summary: Update a row size in a spreadsheet
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: rowId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: number
 *     responses:
 *       200:
 *         description: The row size was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}/title:
 *   put:
 *     summary: Update the title of a spreadsheet
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The title was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}/lastOpen:
 *   put:
 *     summary: Update the last open time of a spreadsheet
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastOpen:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: The last open time was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /spreadsheet/{spreadsheetId}/styles/{cellId}:
 *   put:
 *     summary: Update the styles of a cell in a spreadsheet
 *     tags: [Spreadsheet]
 *     parameters:
 *       - in: path
 *         name: spreadsheetId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: cellId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               styles:
 *                 type: object
 *     responses:
 *       200:
 *         description: The cell styles were successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spreadsheet'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Spreadsheet:
 *       type: object
 *       required:
 *         - title
 *         - lastOpen
 *         - dataState
 *         - rowState
 *         - colState
 *         - stylesState
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the spreadsheet
 *         lastOpen:
 *           type: string
 *           format: date-time
 *           description: The last time the spreadsheet was opened
 *         dataState:
 *           type: object
 *           description: The data state of the spreadsheet
 *         rowState:
 *           type: object
 *           description: The row state of the spreadsheet
 *         colState:
 *           type: object
 *           description: The column state of the spreadsheet
 *         stylesState:
 *           type: object
 *           description: The styles state of the spreadsheet
 *       example:
 *         title: Untitled
 *         lastOpen: 2022-01-01T00:00:00.000Z
 *         dataState: {}
 *         rowState: {}
 *         colState: {}
 *         stylesState: {}
 */ 
