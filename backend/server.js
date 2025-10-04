import express from "express";
import path from "path";
import "dotenv/config";

import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

// API routes should come BEFORE the catch-all route
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Static files and catch-all route should come LAST
const frontendPath = path.join(__dirname, "/frontend/dist");

try {
  app.use(express.static(frontendPath));

  // Use a more specific catch-all that doesn't conflict with API routes
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} catch (error) {
  console.log("Frontend build not found, skipping static file serving");
}

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
