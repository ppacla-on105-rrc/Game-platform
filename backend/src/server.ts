
import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";


const app = express();
const port = Number(process.env.PORT ?? 3000);

// Allow requests from the React frontend
const allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Allow the backend to read JSON request bodies.
app.use(express.json());

// Health check.
app.get("/health", (_req, res) => {
  res.json({
    message: "Game platform backend is running",
  });
});

// Register Review routes.
app.use("/api", reviewRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
