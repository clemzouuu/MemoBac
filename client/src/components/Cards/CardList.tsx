import { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import CardItem from './CardItem';
import { Card } from '../../types/types';
import TagFilter from './TagFilter';
import { API_ENDPOINTS } from '../../utils/constants';

const CardList = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const endpoint = selectedTag
                    ? API_ENDPOINTS.TAGS(selectedTag)
                    : API_ENDPOINTS.CARDS;

                const response = await apiClient.get(endpoint);
                setCards(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, [selectedTag]);

    return (
        <div>
            <TagFilter onSelectTag={setSelectedTag} />
            {cards.map(card => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
};

export default CardList;