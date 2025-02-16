import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { Card } from '../../types/types';
import QuizCard from './QuizCard';

const QuizSession = () => {
    const [quizData, setQuizData] = useState<{
        cards: Card[];
        currentIndex: number;
    }>({ cards: [], currentIndex: 0 });
    const [error, setError] = useState<string>('');
    const [results, setResults] = useState<boolean[]>([]);
    const [showSummary, setShowSummary] = useState(false);

    const startQuiz = async () => {
        try {
            const response = await apiClient.get('/cards/quizz');
            console.log('[QUIZ] Réponse complète:', response.data);

            if (response.data.cards?.length > 0) {
                setQuizData({
                    cards: response.data.cards,
                    currentIndex: 0
                });
                setResults([]);
                setShowSummary(false);
                setError('');
            } else {
                setError('Aucune carte disponible pour le quiz aujourdhui');
            }
        } catch (error: any) {
            console.error('[QUIZ ERROR]', error);
            // setError(error.response?.data?.error?.message || 'Erreur de chargement du quiz');
            setError(error.response?.data?.error?.message || "Pas plus d'un quiz par jour!");
        }
    };

    const handleAnswer = async (isValid: boolean) => {
        try {
            const currentCard = quizData.cards[quizData.currentIndex];
            await apiClient.patch(`/cards/${currentCard.id}/answer`, { isValid });

            setResults(prev => [...prev, isValid]);

            if (quizData.currentIndex < quizData.cards.length - 1) {
                setQuizData(prev => ({
                    ...prev,
                    currentIndex: prev.currentIndex + 1
                }));
            } else {
                setShowSummary(true);
            }
        } catch (error) {
            console.error('[ANSWER ERROR]', error);
        }
    };

    useEffect(() => {
        startQuiz();
    }, []);

    if (error) {
        return (
            <div className="quiz-error">
                <h3>Erreur</h3>
                <p>{error}</p>
                <button onClick={startQuiz}>Réessayer</button>
            </div>
        );
    }

    if (showSummary) {
        return (
            <div className="quiz-summary">
                <h2>📝 Récapitulatif du quiz</h2>
                <p>Réponses correctes: {results.filter(Boolean).length}/{results.length}</p>
                <button onClick={startQuiz}>Recommencer le quiz</button>
            </div>
        );
    }

    if (quizData.cards.length === 0) {
        return <p>Aucune carte disponible pour le quiz aujourd'hui</p>;
    }

    const currentCard = quizData.cards[quizData.currentIndex];

    return (
        <div className="quiz-container">
            <div className="quiz-progress">
                Question {quizData.currentIndex + 1}/{quizData.cards.length}
            </div>

            <QuizCard
                card={currentCard}
                onAnswer={handleAnswer}
            />
        </div>
    );
};

export default QuizSession;