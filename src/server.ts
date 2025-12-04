import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDb, { pool } from "./config/db";
import logger from "./middlewhere/logger";
import { userRoute } from "./modules/user/user.route";
import { userServices } from "./modules/user/user.service";
const app = express();
const port = config.port;

app.use(express.json());

initDb();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", userRoute);

// users CRUD

// todos CRUD

app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );
    res.status(201).json({
      success: true,
      message: "TODOS Create successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
