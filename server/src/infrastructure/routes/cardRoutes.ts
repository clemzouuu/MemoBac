import { Router } from "express";
import { CardController } from "../controllers/CardController";
import { CardService } from "../../application/services/CardService";
import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { CardRepository } from "../repositories/CardRepository"; 

const router = Router();
 
const cardRepository: ICardRepository = new CardRepository();  
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);

router.get("/cards", (req, res) => cardController.getAllCards(req, res));
router.post("/cards", (req, res) => cardController.createCard(req, res));

export default router;
 