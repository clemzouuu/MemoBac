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
  
  async getById(cardId: string): Promise<Card | null> {
    return this.repository.findOne({
      where: { id: cardId },
    });
  }
  
  async getAll(userId: string, tags?: string[]): Promise<Card[]> {
    const query = this.repository.createQueryBuilder("card");
    
     query.where("card.userId = :userId", { userId });

     if (tags && tags.length > 0) {
      query.andWhere("card.tag IN (:...tags)", { tags });
    }
    
    const cards = await query.getMany();
    return cards;
}

  async create(card: Card): Promise<Card> {
    const newCard = this.repository.create(card);
    return await this.repository.save(newCard);
  }

  async getQuizCards(date?: string): Promise<Card[]> {
    console.log("📌 Récupération des cartes du quiz pour la date :", date);
  
    const query = this.repository.createQueryBuilder("card");
  
    if (date) {
      query.where("card.createdAt = :date", { date });  
    }
  
    return await query.getMany();
  }

  async answerCard(cardId: string, isValid: boolean): Promise<Card> {
    const card = await this.repository.findOne({ where: { id: cardId } });
    if (!card) {
        throw new Error("Carte non trouvée");
    }

    if (isValid) {
        if (card.category === Category.SEVENTH) {
           
            card.category = Category.DONE;
        } else {
           
            card.category = this.promoteCategory(card.category) as Category;
        }
    } else {
         card.category = this.demoteCategory(card.category) as Category;
    }

    await this.repository.save(card);
    return card;
}


  private promoteCategory(category: string): string {
    const categories = [
        Category.FIRST, Category.SECOND, Category.THIRD,
        Category.FOURTH, Category.FIFTH, Category.SIXTH,
        Category.SEVENTH, Category.DONE
    ];  

    const index = categories.indexOf(category as Category);
    return index < categories.length - 1 ? categories[index + 1] : category;
}

private demoteCategory(category: string): string {
    const categories = [
        Category.FIRST, Category.SECOND, Category.THIRD,
        Category.FOURTH, Category.FIFTH, Category.SIXTH,
        Category.SEVENTH, Category.DONE
    ];  

    const index = categories.indexOf(category as Category);
    return index > 0 ? categories[index - 1] : category;
}

  
  async getByTag(userId: string, tag: string): Promise<Card[]> {
    return this.repository.find({
        where: { userId, tag },
    });
}

async updateCardTag(cardId: string, userId: string, newTag: string): Promise<Card> {
  const card = await this.repository.findOne({ where: { id: cardId } });

  if (!card) {
      throw new Error("Carte non trouvée.");
  }

  if (card.userId !== userId) {
      throw new Error("Accès interdit : cette carte n'appartient pas à l'utilisateur.");
  }

  card.tag = newTag;  
  await this.repository.save(card);

  return card;
}


  
}
