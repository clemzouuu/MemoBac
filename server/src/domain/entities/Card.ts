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

  constructor(id: string, question: string, answer: string, category: Category, tag?: string) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.category = category;
    this.tag = tag;
  }
}
 