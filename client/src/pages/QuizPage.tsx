import Navbar from '../components/Layout/Navbar';
import QuizSession from '../components/Quiz/QuizSession';

const QuizPage = () => {
    return (
        <div className="quiz-page">
            <Navbar />
            <main>
                <h1>Quiz du jour</h1>
                <QuizSession />
            </main>
        </div>
    );
};

export default QuizPage;  