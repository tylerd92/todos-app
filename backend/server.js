import express from "express";
import "dotenv/config";

import todoRoutes from "./routes/todo.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hey now brown cow!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
