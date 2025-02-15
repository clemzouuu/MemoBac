import { Request, Response, NextFunction } from "express";
import { CardService } from "../../application/services/CardService";
import { CardDTO } from "../../application/dto/CardDTO";
import { QuizService } from "../../application/services/QuizService";

export class CardController {
  constructor(private cardService: CardService,private quizService: QuizService) {}

  async getAllCards(req: Request, res: Response) {
    try {
      const userId = (req as any)?.user?.userId;  
      const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
      const cards = await this.cardService.getAllCards(userId,tags);
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createCard(req: Request, res: Response) {
    try {
      const { question, answer, tag } = req.body;
      const userId = (req as any)?.user?.userId; 
      const cardDTO = new CardDTO(question, answer, tag, userId);
      const newCard = await this.cardService.createCard(cardDTO);
      res.status(201).json(newCard);
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  }

  async getQuizCards(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const quiz = await this.quizService.getOrCreateQuiz(userId);
      console.log("✅ Quiz récupéré/créé:", quiz);
      res.status(200).json(quiz);
    } catch (error) {
      console.error("❌ Erreur dans getQuizCards:", error);
      res.status(400).json({ error: error });
    }
  } 


  async answerCard(req: Request, res: Response): Promise<Response> {  
    try {
      const userId = (req as any)?.user?.userId; 
      const { cardId } = req.params;
      const { isValid } = req.body;

      if (typeof isValid !== "boolean") {
        return res.status(400).json({ error: "Le champ 'isValid' est requis et doit être un booléen." });
      }

      const card = await this.cardService.getCardById(cardId);  
      if (!card) {
        return res.status(404).json({ error: "Carte non trouvée." });
      }

      if (card.userId !== userId) {
        return res.status(403).json({ error: "Accès interdit." });  
      }

      const updatedCard = await this.cardService.answerCard(cardId, isValid);
      return res.status(200).json(updatedCard);
    } catch (error) {
      return res.status(500).json({ error: "Erreur interne du serveur", details: error });
    }

    
}

async getCardsByTag(req: Request, res: Response): Promise<void> {
  try {
      const userId = (req as any).user.userId;
      const { tag } = req.params;

      if (!tag) {
          res.status(400).json({ error: "Le paramètre 'tag' est requis." });
          return;
      }

      const cards = await this.cardService.getCardsByTag(userId, tag);
      res.status(200).json(cards);
  } catch (error) {
      res.status(500).json({ error: "Erreur interne du serveur", details: error });
  }
}

async updateCardTag(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
      const userId = (req as any).user.userId; 
      const { cardId } = req.params;
      const { newTag } = req.body;

      if (!newTag || typeof newTag !== "string") {
          res.status(400).json({ error: "Le champ 'newTag' est requis et doit être une chaîne de caractères." });
          return;
      }

      const updatedCard = await this.cardService.updateCardTag(cardId, userId, newTag);
      res.status(200).json(updatedCard);
  } catch (error) {
      next(error);  
  }
}





  
}
