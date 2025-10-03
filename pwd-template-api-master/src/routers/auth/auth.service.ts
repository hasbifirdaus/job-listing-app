import prisma from "../../lib/config/prisma";
import bcrypt from "bcryptjs";
import { profile } from "console";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { UserRole } from "../../generated/prisma";

//Register
export const registerUser = async (data: {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}) => {
  const existingUser = await prisma.users.findUnique({
    where: { email: data.email },
  });

  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.users.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role || UserRole.JOB_SEEKER,
      name: data.name,
    },
  });
  return newUser;
};

//Login
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1d" }
  );

  return { token, user };
};
