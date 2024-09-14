import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getHighScore, submitScore } from "../controllers/game.controller.js";

const router = express.Router();

router.post('/submit',verifyToken, submitScore);
router.get('/highscore/:userId',verifyToken, getHighScore);

export default router;