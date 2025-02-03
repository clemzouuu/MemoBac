const { DataSource } = require("typeorm");
const { Card } = require("./entities/Card");
const { QuizSession } = require("./entities/QuizSession");
const { User } = require("./entities/User");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "your_password",
  database: "your_database",
  logging: true,
  synchronize: true,
  entities: [Card, QuizSession, User],
  migrations: ["src/database/migrations/*.js"]
});

module.exports = { AppDataSource };
