import { Quiz } from "../entities/Quiz";

export interface IQuizRepository {
  findByUserAndDate(userId: string, date: string): Promise<Quiz | null>;
  createQuiz(quiz: Quiz): Promise<Quiz>;
}
