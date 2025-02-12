import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Quiz } from "./Quiz";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quizzes!: Quiz[];

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password; 
  }
}
