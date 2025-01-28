const express = require('express');
//const cors = require('cors');
// const { initRoutes } = require('./handlers/routes'); // Décommente si utilisé
// const { AppDataSource } = require('./database/database'); // Décommente si utilisé

const main = async () => {
  const app = express();
  const port = 3001;
/*
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

  
  try {
    await AppDataSource.initialize();
    console.log('Connected to database');
  } catch (error) {
    console.error('Cannot contact database', error);
    process.exit(1);
  }
  
  initRoutes(app);
  */

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  app.get('/', (req, res) => {
    res.send('🚀 Serveur Express fonctionne correctement !');
  });
  
};

main();
