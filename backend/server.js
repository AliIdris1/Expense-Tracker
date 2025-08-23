import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "development") {
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST" ,"PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)
};

app.use(express.json());



app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/income" , incomeRoutes)
app.use("/api/v1/expense" , expenseRoutes)
app.use("/api/v1/dashboard" , dashboardRoutes)


if(process.env.NODE_ENV === "development") {
app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
})
}
//server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))



connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
    
})
