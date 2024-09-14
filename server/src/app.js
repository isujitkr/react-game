import express from "express";
import authRoutes from "./routes/auth.route.js";
import gameRoutes from "./routes/game.route.js";
import protectedRoutes from "./routes/protected.route.js"
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/game', gameRoutes);
app.use('/api/v1', protectedRoutes);

app.get('/', (req,res) =>{
    res.send("Api is working...");
});

export default app;