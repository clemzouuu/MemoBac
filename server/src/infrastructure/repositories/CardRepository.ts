import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { Card } from "../../domain/entities/Card";
import { Category } from "../../domain/types/Category";
import { AppDataSource } from "../database/database";
import { Repository } from "typeorm";

export class CardRepository implements ICardRepository {
  private repository: Repository<Card>;

  constructor() {
    this.repository = AppDataSource.getRepository(Card);
  }

  async getAll(tags?: string[]): Promise<Card[]> {
    const query = this.repository.createQueryBuilder("card");

    if (tags && tags.length > 0) {
      query.where("card.tag IN (:...tags)", { tags });
    }

    const cards = await query.getMany();
    return cards;
  }

  async create(card: Card): Promise<Card> {
    const newCard = this.repository.create(card);
    return await this.repository.save(newCard);
  }
}
