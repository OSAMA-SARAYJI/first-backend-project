import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
}); // Load environment variables from .env file

const startServer = async () => {
    console.log(process.env.MONGODB_URI); // debugging: log the MongoDB URI to ensure it's loaded correctly

    try {
        await connectDB(); // Connect to the database

    app.on("error", (error) => {
        console.error("Server error:", error);});
    
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);});
    } catch (error) {
        console.error("Failed to connect to the database:", error);

    }
}

startServer();