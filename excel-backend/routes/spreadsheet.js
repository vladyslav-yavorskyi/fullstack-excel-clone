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
