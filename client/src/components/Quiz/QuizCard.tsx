// V4 (fropm V3) - Add results and showSummary states to display the quiz summary at the end of the quiz
import { Card } from '../../types/types';
import { useState, useEffect } from 'react';

const correctMessages = [
    "BINGO ! Tu gères ! 🎯🔥",
    "Bravo ! On sent l’intelligence dans cette réponse ! 🧠✨",
    "Jackpot ! À ce rythme, tu vas battre le record ! 🎉",
    "Excellente réponse ! Même Google est impressionné. 😎",
    "Correct ! Tu es un génie en herbe ! 🌱🔬",
    "Wouah ! T’as vu cette précision ? C’est du grand art. 🎨👏",
    "T’as répondu ça sans tricher ? Avoue ! 😏",
    "Encore un coup de maître ! Tu vas finir par nous faire peur. 🏆",
    "La classe ! Cette réponse mérite un slow clap. 👏👏👏",
    "OUI ! Ça, c'est du talent pur ! 💡🔥",
    "Si j’avais un chapeau, je l’enlèverais pour toi. 🎩🎩",
    "Une réponse parfaite, digne des plus grands ! 📚🥇",
    "Flash info : une légende du quiz vient d’apparaître ! 🌟",
    "Évidemment que tu as bon ! Trop facile pour toi, non ? 😜",
    "BOUM ! Encore une victoire éclatante ! 💥🎊"
];

const wrongMessages = [
    "Oups... c'était pas ça ! On va dire que c'était un test de réflexes 😆",
    "Hmm... proche, mais pas encore ! Tente encore ! 🤔",
    "Bon, c’était une réponse artistique, mais pas la bonne ! 😂",
    "Ah... on sent l’effort ! Mais c’est non. 😬",
    "T'inquiète, même Einstein s'est déjà trompé... enfin, peut-être. 🤓",
    "Pas loin ! Encore un petit effort ! 🚀",
    "Ah, ça sent la déconnexion du cerveau là... 🧠💨",
    "Ne t’inquiète pas, même les pros se trompent... enfin, rarement. 😜",
    "Faux ! Mais au moins, tu tentes des choses. 😆",
    "On applaudit ton courage, mais pas ta réponse. 👏😅",
    "C’est pas grave, c’était une question-piège... ou pas. 🤭",
    "Ça commence par la bonne lettre, mais c’est pas ça. 😂",
    "Oups, c'était une tentative intéressante... mais ratée. 🤷",
    "On va dire que c’est la faute du clavier, non ? ⌨️😅",
    "Mauvaise réponse ! Mais belle tentative... enfin presque. 🤡"
];

const QuizCard = ({ card, onAnswer }: {
    card: Card;
    onAnswer: (isValid: boolean) => void;
}) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [showSolution, setShowSolution] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState('');

    useEffect(() => {
        setShowSolution(false);
        setUserAnswer('');
        setIsCorrect(false);
        setSelectedMessage('');
    }, [card]);

    const checkAnswer = () => {
        const isAnswerCorrect = userAnswer.trim().toLowerCase() === card.answer.toLowerCase();
        setIsCorrect(isAnswerCorrect);
        setSelectedMessage(
            isAnswerCorrect
                ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
                : wrongMessages[Math.floor(Math.random() * wrongMessages.length)]
        );
        setShowSolution(true);
    };

    return (
        <div className="quiz-card">
            <div className="question-section">
                <h2>{card.question}</h2>

                {!showSolution ? (
                    <>
            <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Écrivez votre réponse ici..."
                key={card.id}
            />
                        <button
                            onClick={checkAnswer}
                            className="check-answer"
                            disabled={!userAnswer.trim()}
                        >
                            Vérifier la réponse
                        </button>
                    </>
                ) : (
                    <div className="solution-section">
                        <div className="feedback-message">
                            {selectedMessage}
                        </div>

                        <div className="answer-comparison">
                            <h3>Votre réponse :</h3>
                            <p>{userAnswer || "(Aucune réponse fournie)"}</p>

                            <h3>Réponse correcte :</h3>
                            <p>{card.answer}</p>
                        </div>

                        <div className="quiz-controls">
                            {!isCorrect && (
                                <button
                                    onClick={() => {
                                        onAnswer(true);
                                        setShowSolution(false);
                                    }}
                                    className="validate-correct"
                                >
                                    ✅ Ma réponse était correcte
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    onAnswer(isCorrect);
                                    setShowSolution(false);
                                }}
                                className={`next-question ${isCorrect ? 'correct' : ''}`}
                            >
                                {isCorrect ? '➡️ Question suivante' : '❌ Question suivante'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizCard;