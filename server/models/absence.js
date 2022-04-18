import mongoose from "mongoose";

// define a mongoose schema for items
const absenceSchema = mongoose.Schema({
    admitterId: Number,
    admitterNote: String,
    confirmedAt: Date,
    createdAt: Date,
    crewId: Number,
    endDate: Date,
    id: Number,
    memberNote: String,
    rejectedAt: Date,
    startDate: Date,
    type: String,
    userId: Number
});

// construct an item model, using the item schema
const Absence = mongoose.model("Absence", absenceSchema);

export default Absence;
