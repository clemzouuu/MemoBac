const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    username: { type: "varchar", length: 50, unique: true },
    password: { type: "text", nullable: false },
    createdAt: { type: "timestamp", createDate: true }
  },
  checks: [
    { expression: "LENGTH(password) >= 8", name: "password_length_check" }
  ]
});

User.hashPassword = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
};

module.exports = { User };
