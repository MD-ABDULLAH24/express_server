import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.createUser(name, email);
    res.status(201).json({
      success: false,
      message: "Data inserted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Fetched Successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
      const result = await userServices.updateUser(
        name,
        email,
        req.params.id as string
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User Updated successfully...",
          data: result.rows[0],
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };;

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser
};
