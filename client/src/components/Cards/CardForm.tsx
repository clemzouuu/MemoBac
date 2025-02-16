import { useState } from 'react';
import apiClient from '../../api/apiClient';

const CardForm = ({ onCardCreated }: { onCardCreated: () => void }) => {
    const [newCard, setNewCard] = useState({ question: '', answer: '', tag: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiClient.post('/cards', newCard);
            setNewCard({ question: '', answer: '', tag: '' });
            onCardCreated();
        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card-form">
            <input
                type="text"
                placeholder="Question"
                value={newCard.question}
                onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
            />
            <textarea
                placeholder="Réponse"
                value={newCard.answer}
                onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
            />
            <input
                type="text"
                placeholder="Tag (optionnel)"
                value={newCard.tag}
                onChange={(e) => setNewCard({ ...newCard, tag: e.target.value })}
            />
            <button type="submit">Créer la fiche</button>
        </form>
    );
};

export default CardForm;