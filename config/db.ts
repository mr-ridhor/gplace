import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    // Check if the connection is already established
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    // Connect to MongoDB using the connection string from the environment variable
    await mongoose.connect(process.env.MONGO_URL as string);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
