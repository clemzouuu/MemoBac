import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { Card } from "../../domain/entities/Card";
import { SchedulingService } from "./SchedulingService";

export class LeitnerService {
  constructor(private cardRepository: ICardRepository,private schedulingService: SchedulingService) {}

  async getCardsForQuiz(date?: string): Promise<Card[]> {
    return this.cardRepository.getQuizCards(date);
  }

  async updateCardProgression(card: Card): Promise<void> {
    console.log("Mise à jour de la progression Leitner pour la carte :", card.id);

    const nextReviewDate = this.schedulingService.calculateNextReviewDate(card.category);
    card.nextReviewDate = nextReviewDate;

    await this.cardRepository.create(card);  
  }
}
