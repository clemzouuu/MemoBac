import { Card } from "../../domain/entities/Card";

export interface ICardRepository {
  getAll(tags?: string[]): Promise<Card[]>;
  create(card: Card): Promise<Card>;
}
