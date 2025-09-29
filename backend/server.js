import express from "express"
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
// import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
// Enable CORS for all environments
app.use(cors({
    origin: ["https://thinkboard-frontend-vqvx.onrender.com", "http://localhost:5173"],
    credentials: true
}));

app.use(express.json());

app.use("/api/notes",notesRoutes);

// Simple root route
app.get("/", (req, res) => {
    res.json({ message: "Thinkboard API is running!" });
});

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server started on PORT: http://localhost:${PORT}`);
});
});