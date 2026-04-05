import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import { refreshAccessToken, logoutUser } from "../services/authService.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: user.id },

      process.env.JWT_SECRET as string,

      { expiresIn: "7d" },
    );

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,

        userId: user.id,
      },
    });

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    const newAccessToken = await refreshAccessToken(refreshToken);

    res.json({
      accessToken: newAccessToken,
    });
  } catch {
    res.status(401).json({
      message: "Invalid refresh token",
    });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    await logoutUser(refreshToken);

    res.json({
      message: "Logged out successfully",
    });
  } catch {
    res.status(500).json({
      message: "Error logging out",
    });
  }
}
