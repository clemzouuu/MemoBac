import { Router } from "express";
import { UserService } from "../../application/services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../../application/services/AuthService";
import authMiddleware from "../../middleware/authMiddleware"; 

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(userService, authService);

router.post("/auth/register", (req, res) => authController.register(req, res));
router.post("/auth/login", (req, res) => authController.login(req, res));

router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "Vous êtes authentifié", user: (req as any).user });
});

export default router;
