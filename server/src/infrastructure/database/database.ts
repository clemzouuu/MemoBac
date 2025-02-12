import "reflect-metadata";
import { DataSource } from "typeorm";
import { Card } from "../../domain/entities/Card"; 
import { User } from "../../domain/entities/User"; 
import { Quiz } from "../../domain/entities/Quiz"; 

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "your_password",
  database: "your_database",
  logging: true,
  synchronize: true,
  entities: [Card,User,Quiz],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
});
