import { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/UserService";
import { AuthService } from "../../application/services/AuthService";

export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const newUser = await this.userService.register(username, password);
      res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await this.authService.login(username, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }
}
