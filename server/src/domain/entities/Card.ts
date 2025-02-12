import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Category } from "../types/Category";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ nullable: true })
  tag?: string;

  @Column({ type: "enum", enum: Category, default: Category.FIRST })
  category: Category;

  @Column({ type: "date", nullable: true })  
  nextReviewDate?: Date;

  @Column()
  userId:string;

  constructor(id: string, question: string, answer: string, category: Category, userId:string, tag?: string) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.category = category;
    this.tag = tag;
    this.userId = userId;
  }
}
 