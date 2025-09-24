import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Express = express();
const port: number = 8000;

app.use(
  cors({
    origin: "http://localhost:3000", // asal frontend
    credentials: true, // izinkan cookie / header auth
  })
);
app.use(express.json());

//Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err?.message,
    data: [],
  });
});

//running app
app.listen(port, () => {
  console.log(`[🔥API] Running in http://localhost:${port}/`);
});
