import express from "express";
import path from "path";
import "dotenv/config";

import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
