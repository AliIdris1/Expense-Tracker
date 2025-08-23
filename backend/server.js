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

// Use CORS only in development to allow the front-end dev server to communicate
// The 'production' environment will be served from the same domain, so CORS is not needed
if(process.env.NODE_ENV === "development") {
    app.use(
        cors({
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            methods: ["GET", "POST" ,"PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    )
};

app.use(express.json());

// API Routes should be defined for both environments
app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/income" , incomeRoutes)
app.use("/api/v1/expense" , expenseRoutes)
app.use("/api/v1/dashboard" , dashboardRoutes)


// This is the CRITICAL change: Serve the static frontend files only in production
if(process.env.NODE_ENV === "production") {
    // Serve static files from the build directory of the frontend
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    // Serve the index.html for all other routes.
    // This MUST be after the API routes so that API calls are not mistakenly served the HTML file.
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    });
}


// Server uploads folder - this can be shared between development and production
app.use("/uploads", express.static(path.join(__dirname, "uploads")))



connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
    
})
