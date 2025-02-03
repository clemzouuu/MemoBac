const { EntitySchema } = require("typeorm");

const QuizSession = new EntitySchema({
  name: "QuizSession",
  tableName: "quiz_sessions",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    date: { type: "date", nullable: false },
    createdAt: { type: "timestamp", createDate: true }
  },
  relations: {
    cards: {
      target: "Card",
      type: "many-to-many",
      joinTable: true
    }
  }
});

module.exports = { QuizSession };
