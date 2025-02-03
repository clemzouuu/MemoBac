const express = require("express");
const cardsRoutes = require("./routes/cardsRoutes");
const userRoutes = require("./routes/userRoutes");

const initRoutes = (app) => {
  app.use(express.json());
  app.use(userRoutes);
  app.use(cardsRoutes);
};

module.exports = { initRoutes };
