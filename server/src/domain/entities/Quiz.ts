import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,ManyToOne } from "typeorm";
import { Card } from "./Card";
import { User } from "./User";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @ManyToMany(() => Card)
  @JoinTable()
  cards: Card[];

  @ManyToOne(() => User, (user) => user.quizzes, { onDelete: "CASCADE" })
  user: User;

  constructor(id: string, date: string, cards: Card[],user: User) {
    this.id = id;
    this.date = date;
    this.cards = cards;
    this.user = user;
  }
}
