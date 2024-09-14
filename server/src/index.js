import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Serving is listening at http://localhost:${port}`)
    })
})
.catch((err)=>{
    console.log("Mongodb error: ", err);
})