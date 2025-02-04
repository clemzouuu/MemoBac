import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { Card } from "../../domain/entities/Card";
import { CardDTO } from "../dto/CardDTO";
import { Category } from "../../domain/types/Category";

export class CreateCardUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(data: CardDTO): Promise<Card> {
    const newCard = new Card(
      crypto.randomUUID(),
      data.question,
      data.answer,
      Category.FIRST, 
      data.tag
    );
    return await this.cardRepository.create(newCard);
  }
}
