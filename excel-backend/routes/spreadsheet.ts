import express from 'express';
import { Request as ExpressRequest, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import Spreadsheet from '../models/Spreadsheet.js';
const router = express.Router();


interface Request extends ExpressRequest {
    params: ParamsDictionary;
}

router.post('/', async (req, res) => {
    const newSpreadsheet = new Spreadsheet({
        title: "Untitled",
        lastOpen: Date.now(),
        dataState: new Map(),
        rowState: new Map(),
        colState: new Map(),
        stylesState: new Map()
    });

    try {
        const savedSpreadsheet = await newSpreadsheet.save();
        res.status(200).json(savedSpreadsheet);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/:spreadsheetId', async (req: Request, res: Response) => {
    try {
        const spreadsheets = await Spreadsheet.find({ _id: req.params.spreadsheetId });
        res.status(200).json(spreadsheets);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:spreadsheetId/cell/:cellId', async (req, res) => {
    try {
        const spreadsheet = await Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({error: "Spreadsheet not found"});
        }

        // Update the cell data
        if (spreadsheet.dataState) {
            spreadsheet.dataState.set(req.params.cellId, req.body.data);
        }

        // Save the updated spreadsheet
        const updatedSpreadsheet = await spreadsheet.save();

        res.status(200).json(updatedSpreadsheet);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:spreadsheetId/col/:colId', async (req, res) => {
    try {
        const spreadsheet = await Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({error: "Spreadsheet not found"});
        }

        // Update the column size
        if (spreadsheet.colState) {
            spreadsheet.colState.set(req.params.colId, req.body.size);
        }

        // Save the updated spreadsheet
        const updatedSpreadsheet = await spreadsheet.save();

        res.status(200).json(updatedSpreadsheet);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:spreadsheetId/row/:rowId', async (req, res) => {
    try {
        const spreadsheet = await Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({error: "Spreadsheet not found"});
        }

        // Update the row size
        if (spreadsheet.rowState) {
            spreadsheet.rowState.set(req.params.rowId, req.body.size);
        }

        // Save the updated spreadsheet
        const updatedSpreadsheet = await spreadsheet.save();

        res.status(200).json(updatedSpreadsheet);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:spreadsheetId/title', async (req, res) => {
    try {
        const spreadsheet = await Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({error: "Spreadsheet not found"});
        }

        // Update the title
        spreadsheet.title = req.body.title;

        // Save the updated spreadsheet
        const updatedSpreadsheet = await spreadsheet.save();

        res.status(200).json(updatedSpreadsheet);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:spreadsheetId/lastOpen', async (req, res) => {
    try {
        const spreadsheet = await Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({error: "Spreadsheet not found"});
        }

        // Update the lastOpen timestamp
        spreadsheet.lastOpen = req.body.lastOpen;

        // Save the updated spreadsheet
        const updatedSpreadsheet = await spreadsheet.save();

        res.status(200).json(updatedSpreadsheet);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:spreadsheetId/styles/:cellId', async (req, res) => {
    try {
        const spreadsheet = await Spreadsheet.findById(req.params.spreadsheetId);
        if (!spreadsheet) {
            return res.status(404).json({error: "Spreadsheet not found"});
        }

        // Update the styles
        if (spreadsheet.stylesState) {
            spreadsheet.stylesState.set(req.params.cellId, req.body.styles);
        }

        // Save the updated spreadsheet
        const updatedSpreadsheet = await spreadsheet.save();

        res.status(200).json(updatedSpreadsheet);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:spreadsheetId', async (req, res) => {
    try {
        const updatedSpreadsheet = await Spreadsheet.findByIdAndUpdate(req.params.spreadsheetId, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedSpreadsheet);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:spreadsheetId', async (req, res) => {
    try {
        await Spreadsheet.findByIdAndDelete({ _id: req.params.spreadsheetId });
        res.status(200).json("Spreadsheet has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

export default router;
