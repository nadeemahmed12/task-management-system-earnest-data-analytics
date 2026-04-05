import type { Response } from "express";
import prisma from "../config/prisma.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

// CREATE TASK
export async function createTask(req: AuthRequest, res: Response) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.userId!,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
    });
  }
}

// GET ALL TASKS (of logged in user)
export async function getTasks(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // query params
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search as string;
    const status = req.query.status as string;

    const skip = (page - 1) * limit;

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId,

        ...(search && {
          title: {
            contains: search,
          },
        }),

        ...(status !== undefined && {
          status: status === "true",
        }),
      },

      skip,
      take: limit,

      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.task.count({
      where: {
        userId: req.userId,
      },
    });

    res.json({
      total,
      page,
      limit,
      tasks,
    });
  } catch {
    res.status(500).json({
      message: "Error fetching tasks",
    });
  }
}

// UPDATE TASK STATUS
export async function updateTask(req: AuthRequest, res: Response) {
  try {
    const taskId = Number(req.params.id);

    const { title, description, status } = req.body;

    const task = await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        title,
        description,
        status,
      },
    });

    res.json(task);
  } catch {
    res.status(500).json({
      message: "Error updating task",
    });
  }
}

// DELETE TASK
export async function deleteTask(req: AuthRequest, res: Response) {
  try {
    const taskId = Number(req.params.id);

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.json({
      message: "Task deleted",
    });
  } catch {
    res.status(500).json({
      message: "Error deleting task",
    });
  }
}

export const toggleTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.userId !== req.userId) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        status: !task.status,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
