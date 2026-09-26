import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
