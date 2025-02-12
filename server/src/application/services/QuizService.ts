import { Repository } from "typeorm";
import { Quiz } from "../../domain/entities/Quiz";
import { User } from "../../domain/entities/User";
import { Card } from "../../domain/entities/Card";
import { AppDataSource } from "../../infrastructure/database/database";
import { IsNull, LessThanOrEqual } from "typeorm";


export class QuizService {
  private quizRepository: Repository<Quiz>;
  private userRepository: Repository<User>;
  private cardRepository: Repository<Card>;

  constructor() {
    this.quizRepository = AppDataSource.getRepository(Quiz);
    this.userRepository = AppDataSource.getRepository(User);
    this.cardRepository = AppDataSource.getRepository(Card);
  }

async getOrCreateQuiz(userId: string): Promise<Quiz> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["quizzes"],
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé.");
    }

    const today = new Date().toISOString().split("T")[0];

    const existingQuiz = await this.quizRepository.findOne({
      where: { user: { id: userId }, date: today },
    });

    if (existingQuiz) {
      throw new Error("Vous avez déjà effectué votre quiz aujourd'hui.");
    }

    const quizCards = await this.cardRepository.find({
        where: [
            { userId: userId, nextReviewDate: LessThanOrEqual(today) },  
            { userId: userId, nextReviewDate: IsNull() }  
          ]
    });

    if (quizCards.length === 0) {
      throw new Error("Aucune carte disponible pour un quiz aujourd’hui.");
    }

    const newQuiz = this.quizRepository.create({ date: today, cards: quizCards, user });
    await this.quizRepository.save(newQuiz);

    return newQuiz;
  }
}
