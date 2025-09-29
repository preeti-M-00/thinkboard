import express from "express"
// const express = require("express");
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
// import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

//middleware
// Enable CORS for all environments
app.use(cors({
    origin: ["https://thinkboard-frontend-vqvx.onrender.com", "http://localhost:5173"],
    credentials: true
}));

app.use(express.json()); //this middleware will parse JSON bodies: get access to req.body

// app.use(rateLimiter)

//our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/Thinkboard/dist")))

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","thinkboard","dist","index.html"));
})
}

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server started on PORT: http://localhost:${PORT}`);
});
});

// mongodb://localhost:27017