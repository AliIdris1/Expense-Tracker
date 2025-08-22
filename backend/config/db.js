const mongoose = require("mongoose")  
mongoose.set('strictQuery', false);  // Add this before connecting
const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {})
        console.log("MongoDB connected")
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
        process.exit(1)
    }
}


module.exports = connectDB;  