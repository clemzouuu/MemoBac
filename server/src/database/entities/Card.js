const { EntitySchema } = require("typeorm");

const Card = new EntitySchema({
  name: "Card",
  tableName: "cards",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    question: { type: "text", nullable: false },
    answer: { type: "text", nullable: false },
    tag: { type: "varchar", length: 50, nullable: false },
    category: { type: "varchar", length: 20, nullable: false, default: "FIRST" },
    createdAt: { type: "timestamp", createDate: true },
    updatedAt: { type: "timestamp", updateDate: true }
  }
});

module.exports = { Card };
