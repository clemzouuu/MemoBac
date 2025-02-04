import { Card } from "../../domain/entities/Card";
import { CardDTO } from "../../application/dto/CardDTO";

export class CardAdapter {
  static toDTO(card: Card): CardDTO {
    return new CardDTO(card.question, card.answer, card.tag);
  }

  static fromDTO(dto: CardDTO, id: string, category: string): Card {
    return new Card(id, dto.question, dto.answer, category, dto.tag);
  }
}
