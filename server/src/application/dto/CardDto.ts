export class CardDTO {
  question: string;
  answer: string;
  tag?: string;
  userId: string;

  constructor(question: string, answer: string, userId: string, tag?: string) {
    this.question = question;
    this.answer = answer;
    this.tag = tag;
    this.userId = userId;
  }
}
 