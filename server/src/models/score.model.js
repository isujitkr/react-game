import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    highScore: {
        type: Number,
        default: 0,
    },
    pastScores: {
        type: [Number],
        default: [],
    },
},{timestamps: true});

const Score = mongoose.model("Score", scoreSchema);
export default Score;