import { Card } from '../../types/types';
import { useState } from 'react';
import apiClient from '../../api/apiClient';

const CardItem = ({ card }: { card: Card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentTag, setCurrentTag] = useState(card.tag || '');

    const handleTagUpdate = async () => {
        try {
            await apiClient.patch(`/cards/${card.id}/tag`, { newTag: currentTag });
        } catch (error) {
            console.error('Error updating tag:', error);
        }
    };

    return (
        <div className="card-item" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`card-content ${isFlipped ? 'flipped' : ''}`}>
                <div className="card-front">
                    <h3>{card.question}</h3>
                    <p>Catégorie: {card.category}</p>
                </div>
                <div className="card-back">
                    <p>{card.answer}</p>
                    <div className="tag-editor">
                        <input
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button onClick={handleTagUpdate}>✎</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;