import "dotenv/config";
import express from "express";
import prisma from "./config/prisma.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json({
    message: "API working 🚀",
    users,
  });
});
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
