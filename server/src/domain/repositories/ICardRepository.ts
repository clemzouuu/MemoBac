import { Card } from "../../domain/entities/Card";

export interface ICardRepository {
  getAll(cardId: string,tags?: string[]): Promise<Card[]>;
  getById(cardId: string): Promise<Card | null>;
  create(card: Card): Promise<Card>;
  getQuizCards(date?: string): Promise<Card[]>;
  answerCard(cardId: string, isValid: boolean): Promise<Card>;
  getByTag(userId: string, tag: string): Promise<Card[]>; 
  updateCardTag(cardId: string, userId: string, newTag: string): Promise<Card>;

}
