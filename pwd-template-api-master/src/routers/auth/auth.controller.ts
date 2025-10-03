import { Request, Response } from "express";
import { registerUser, loginUser } from "../auth/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;
    const user = await registerUser({ email, password, name, role });
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
