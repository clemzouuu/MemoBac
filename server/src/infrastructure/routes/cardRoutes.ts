import { Router } from "express";
import { CardController } from "../controllers/CardController";
import { CardService } from "../../application/services/CardService";
import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { CardRepository } from "../repositories/CardRepository";
import { LeitnerService } from "../../application/services/LeitnerService";
import { SchedulingService } from "../../application/services/SchedulingService"; 
import authMiddleware from "../../middleware/authMiddleware";
import { QuizService } from "../../application/services/QuizService";

const router = Router();

const schedulingService = new SchedulingService();
const cardRepository: ICardRepository = new CardRepository();
const leitnerService = new LeitnerService(cardRepository, schedulingService);
const cardService = new CardService(cardRepository, leitnerService);
const quizService = new QuizService(); 
const cardController = new CardController(cardService,quizService);
 

router.get("/cards", authMiddleware, (req, res) => cardController.getAllCards(req, res));
router.post("/cards", authMiddleware, (req, res) => cardController.createCard(req, res));
router.get("/cards/quizz",authMiddleware, (req, res) => cardController.getQuizCards(req, res));
router.patch("/cards/:cardId/answer",authMiddleware, async (req, res, next) => {
    try {
      await cardController.answerCard(req, res);
    } catch (error) {
      next(error);
    }
});
router.get("/cards/tags/:tag", authMiddleware, (req, res) => cardController.getCardsByTag(req, res)); 
router.patch("/cards/:cardId/tag", authMiddleware, async (req, res, next) => {
  try {
      await cardController.updateCardTag(req, res, next);
  } catch (error) {
      next(error);
  }
});




  
export default router;
