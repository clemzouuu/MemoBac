const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../database/database");
const { User } = require("../database/entities/User");

class UserUsecase {
  constructor() {
    // On récupère le repository associé à l'entité User
    this.userRepository = AppDataSource.getRepository(User);
  }

  // Créer un nouvel utilisateur
  async createUser({ username, password }) {
    try {
      // Vérifie si un utilisateur avec le même nom existe déjà
      const existingUser = await this.userRepository.findOne({ where: { username } });
      if (existingUser) {
        throw new Error("L'utilisateur existe déjà");
      }

      // Hache le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({ username, password: hashedPassword });
      // Sauvegarde l'utilisateur dans la base de données
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur", error);
      throw error;
    }
  }

  // Connecter un utilisateur et retourner un token JWT
  async loginUser({ username, password }) {
    try {
      // Recherche l'utilisateur par son nom
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user) return null;

      // Compare le mot de passe fourni avec le hash stocké
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return null;

      // Utilise une variable d'environnement pour la clé secrète
      const secretKey = process.env.JWT_SECRET || "SECRET_KEY";
      return jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur", error);
      throw error;
    }
  }
}

module.exports = new UserUsecase();