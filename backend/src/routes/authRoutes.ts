import express from "express";

import { loginUser, registerUser,refreshTokenController,logoutController } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);

export default router;