const express = require("express");
const router = express.Router();
const CardsUsecase = require("../usecases/cardsUsecase");
const { createCardValidation, answerCardValidation } = require("../validators/cardValidator");

// Récupérer toutes les cartes (option de filtrage par tags)
router.get("/cards", async (req, res) => {
  try {
    const tags = req.query.tags ? req.query.tags.split(",") : null;
    const cards = await CardsUsecase.getAllCards(tags);
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des cartes" });
  }
});

// Créer une nouvelle carte
router.post("/cards", async (req, res) => {
  const { error } = createCardValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details.map(d => d.message) });

  try {
    const newCard = await CardsUsecase.createCard(req.body);
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la carte" });
  }
});

// Récupérer les cartes à réviser aujourd’hui
router.get("/cards/quizz", async (req, res) => {
  try {
    const date = req.query.date;
    const quizCards = await CardsUsecase.getQuizCards(date);
    res.status(200).json(quizCards);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des cartes du quiz" });
  }
});

// Mettre à jour une carte avec la réponse de l'utilisateur
router.patch("/cards/:cardId/answer", async (req, res) => {
  const { error } = answerCardValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details.map(d => d.message) });

  try {
    const { cardId } = req.params;
    const { isValid } = req.body;
    await CardsUsecase.answerCard(cardId, isValid);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la carte" });
  }
});

module.exports = router;
