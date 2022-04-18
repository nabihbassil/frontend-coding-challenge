import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
    crewId: Number,
    id: Number,
    image: String,
    name: String,
    userId: Number
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
