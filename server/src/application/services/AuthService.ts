import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserService } from "./UserService"; 

const JWT_SECRET = "MYSTERE";  

export class AuthService {
  constructor(private userService: UserService) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
        throw new Error("Utilisateur non trouvé.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Mot de passe incorrect.");
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username }, 
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return token;
}

}