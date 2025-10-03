import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routers/auth/auth.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // asal frontend
    credentials: true, // izinkan cookie / header auth
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

//Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err?.message,
    data: [],
  });
});

export default app;
