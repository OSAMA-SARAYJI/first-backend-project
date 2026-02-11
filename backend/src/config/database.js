import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`); }
    catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with an error code
  }
}

export default connectDB;
