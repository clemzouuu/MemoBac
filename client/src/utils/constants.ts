export const API_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CARDS: '/cards',
    QUIZ: '/cards/quizz',
    TAGS: (tag: string) => `/cards/tags/${tag}`,
    CARD_TAG: (cardId: string) => `/cards/${cardId}/tag`,
    CARD_ANSWER: (cardId: string) => `/cards/${cardId}/answer`
};

export const CATEGORY_COLORS = {
    FIRST: '#ff6b6b',
    SECOND: '#4ecdc4',
    THIRD: '#45b7d1',
    FOURTH: '#96ceb4',
    FIFTH: '#ffeead',
    SIXTH: '#ff9999',
    SEVENTH: '#d291bc'
};