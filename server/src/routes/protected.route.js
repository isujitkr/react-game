import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/verify-token', verifyToken, (req, res) => {
    res.status(200).json({ success: true, message: 'Access granted', user: req.user });
});

export default router;