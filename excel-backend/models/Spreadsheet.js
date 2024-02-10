import mongoose from 'mongoose';
const spreadsheetSchema = new mongoose.Schema({
    title: { type: String, default: "Untitled" },
    lastOpen: { type: Number, required: true },
    dataState: { type: Map, of: String },
    rowState: { type: Map, of: Number },
    colState: { type: Map, of: Number },
    stylesState: {
        type: Map,
        of: { type: Map, of: String } // Each cell can have a map of styles
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});
export default mongoose.model('Spreadsheet', spreadsheetSchema);
