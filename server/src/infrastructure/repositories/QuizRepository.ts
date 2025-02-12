import { Repository } from "typeorm";
import { Quiz } from "../../domain/entities/Quiz";
import { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import { AppDataSource } from "../database/database";

export class QuizRepository implements IQuizRepository {
  private repository: Repository<Quiz>;

  constructor() {
    this.repository = AppDataSource.getRepository(Quiz);
  }

  async findByUserAndDate(userId: string, date: string): Promise<Quiz | null> {
    return this.repository.findOne({
      where: { user: { id: userId }, date },
      relations: ["cards"],
    });
  }

  async createQuiz(quiz: Quiz): Promise<Quiz> {
    return await this.repository.save(quiz);
  }
}
