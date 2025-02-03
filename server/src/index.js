const express = require("express");
const cors = require("cors");
const { initRoutes } = require("./initRoutes");
const { AppDataSource } = require("./database/database");

const main = async () => {
  const app = express();
  const port = 3001;

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());

  try {
    await AppDataSource.initialize();
    console.log("✅ Connecté à la base de données");
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données", error);
    process.exit(1);
  }

  initRoutes(app);

  app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
  });
};

main();
