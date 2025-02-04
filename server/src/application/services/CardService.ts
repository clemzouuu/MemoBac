import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { Card } from "../../domain/entities/Card";
import { CardDTO } from "../dto/CardDTO";
import { Category } from "../../domain/types/Category";
import { v4 as uuidv4 } from "uuid";  

export class CardService {
  constructor(private cardRepository: ICardRepository) {}

  async getAllCards(tags?: string[]): Promise<Card[]> {
    return this.cardRepository.getAll(tags || []);
  }

  async createCard(data: CardDTO): Promise<Card> {
     const newCard = new Card(uuidv4(), data.question, data.answer, Category.FIRST, data.tag);
    return this.cardRepository.create(newCard);
  }
}
