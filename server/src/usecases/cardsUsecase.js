const { AppDataSource } = require("../database/database");
const { Card } = require("../database/entities/Card");

class CardsUsecase {
  constructor() {
    this.cardRepository = AppDataSource.getRepository(Card);
  }

  // Récupérer toutes les cartes (avec option de filtrage par tag)
  async getAllCards(tags) {
    try {
      const query = this.cardRepository.createQueryBuilder("card");
      if (tags) {
        query.where("card.tag IN (:...tags)", { tags });
      }
      return await query.getMany();
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes", error);
      throw error;
    }
  }

  // Créer une nouvelle carte
  async createCard(data) {
    try {
      const newCard = this.cardRepository.create(data);
      return await this.cardRepository.save(newCard);
    } catch (error) {
      console.error("Erreur lors de la création de la carte", error);
      throw error;
    }
  }

  // Récupérer les cartes à réviser aujourd’hui
  async getQuizCards(date) {
    try {
      return await this.cardRepository.find({
        where: { nextReviewDate: date || new Date().toISOString().split("T")[0] },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes du quiz", error);
      throw error;
    }
  }

  // Mettre à jour une carte en fonction de la réponse donnée
  async answerCard(cardId, isValid) {
    try {
      const card = await this.cardRepository.findOne({ where: { id: cardId } });
      if (!card) throw new Error("Carte introuvable");

      card.category = isValid ? this.getNextCategory(card.category) : "FIRST";
      return await this.cardRepository.save(card);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la carte", error);
      throw error;
    }
  }

  // Définir la catégorie suivante en fonction du système Leitner
  getNextCategory(category) {
    const categories = [
      "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "DONE"
    ];
    const index = categories.indexOf(category);
    return index >= 0 && index < categories.length - 1 ? categories[index + 1] : "DONE";
  }
}

module.exports = new CardsUsecase();
