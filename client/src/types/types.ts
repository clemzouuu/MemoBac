export type Card = {
    id: string;
    question: string;
    answer: string;
    tag?: string;
    category: string;
    nextReviewDate?: Date;
    userId: string;
};

export type Quiz = {
    id: string;
    date: string;
    cards: Card[];
};