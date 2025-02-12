import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { Card } from "../../domain/entities/Card";
import { LeitnerService } from "./LeitnerService";
import { CardDTO } from "../dto/CardDTO";
import { Category } from "../../domain/types/Category";
import { v4 as uuidv4 } from "uuid";  

export class CardService {
 
  constructor(private cardRepository: ICardRepository,private leitnerService: LeitnerService) {}

  async getAllCards(userId: string, tags?: string[]): Promise<Card[]> {
    return this.cardRepository.getAll(userId, tags || []);
  }

  async createCard(data: CardDTO): Promise<Card> {
     const newCard = new Card(uuidv4(), data.question, data.answer, Category.FIRST, data.tag || "", data.userId);
    return this.cardRepository.create(newCard);
  }

  async getQuizCards(date?: string): Promise<Card[]> {
    return this.leitnerService.getCardsForQuiz(date);
  }
  
  async answerCard(cardId: string, isValid: boolean): Promise<Card> {
    const updatedCard = await this.cardRepository.answerCard(cardId, isValid);
    await this.leitnerService.updateCardProgression(updatedCard);
    return updatedCard;
  }

  async getCardById(cardId: string): Promise<Card | null> {
    return this.cardRepository.getById(cardId);
  }

  async getCardsByTag(userId: string, tag: string): Promise<Card[]> {
    return this.cardRepository.getByTag(userId, tag);
}

async updateCardTag(cardId: string, userId: string, newTag: string): Promise<Card> {
  return this.cardRepository.updateCardTag(cardId, userId, newTag);
}


  
}
