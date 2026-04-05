import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export async function refreshAccessToken(token: string) {
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token },
  });

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
    userId: number;
  };

  const newAccessToken = jwt.sign(
    { userId: payload.userId },

    process.env.JWT_SECRET as string,

    { expiresIn: "15m" },
  );

  return newAccessToken;
}

export async function logoutUser(token: string) {
  await prisma.refreshToken.delete({
    where: {
      token,
    },
  });
}
