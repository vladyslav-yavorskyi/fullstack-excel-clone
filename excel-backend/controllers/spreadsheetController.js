"use strict";
// import Spreadsheet from "../models/Spreadsheet";
// import {Request as ExpressRequest} from "express";
// import {ParamsDictionary} from "express-serve-static-core";
// interface Request extends ExpressRequest {
//     params: ParamsDictionary;
// }
// const createNewSpreadsheet = async (req: Request, res: Response) => {
//     const newSpreadsheet = new Spreadsheet({
//         title: "Untitled",
//         lastOpen: Date.now(),
//         dataState: new Map(),
//         rowState: new Map(),
//         colState: new Map(),
//         stylesState: new Map()
//     });
//
//     try {
//         const savedSpreadsheet = await newSpreadsheet.save();
//         res.status(200).json(savedSpreadsheet);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }
