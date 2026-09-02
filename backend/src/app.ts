import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: false
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "1Fi EMI API is healthy"
  });
});

app.use("/api/products", productRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

export default app;
