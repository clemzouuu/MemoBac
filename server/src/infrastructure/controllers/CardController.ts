import { Request, Response } from "express";
import { CardService } from "../../application/services/CardService";
import { CardDTO } from "../../application/dto/CardDTO";

export class CardController {
  constructor(private cardService: CardService) {}

  async getAllCards(req: Request, res: Response) {
    try {
      const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
      const cards = await this.cardService.getAllCards(tags);
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createCard(req: Request, res: Response) {
    try {
      const { question, answer, tag } = req.body;
      const cardDTO = new CardDTO(question, answer, tag);
      const newCard = await this.cardService.createCard(cardDTO);
      res.status(201).json(newCard);
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  }
  
}
