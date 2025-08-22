import mongoose from "mongoose";

mongoose.set("strictQuery", false); // Add this before connecting

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the environment variable
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    // Log any errors that occur during the connection attempt
    console.error("Error connecting to MongoDB", error.message);
    // Exit the process with a failure code
    process.exit(1);
  }
};

// Export the connectDB function as the default export
export default connectDB;

