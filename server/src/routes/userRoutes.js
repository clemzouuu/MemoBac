const express = require("express");
const router = express.Router();
const { validateCreateUser, validateLoginUser } = require("../validators/userValidator");
const UserUsecase = require("../usecases/UserUsecase");

// Middleware de validation pour la création d'utilisateur
router.post("/register", async (req, res, next) => {
  const { error } = validateCreateUser(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) });
  }
  try {
    const user = await UserUsecase.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Middleware de validation pour la connexion
router.post("/login", async (req, res, next) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) });
  }
  try {
    const token = await UserUsecase.loginUser(req.body);
    if (!token) {
      return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
