import express from "express";
const app = express(); // Create an Express application   

app.use(express.json()); // Middleware to parse JSON request bodies
import userRouter from "./routes/user.route.js"; // Import user routes
import postRouter from "./routes/post.route.js"; // Import post routes
app.use("/api/v1/users", userRouter); // Use user routes with the specified path
app.use("/api/v1/posts", postRouter); // Use post routes with the specified path

export default app;