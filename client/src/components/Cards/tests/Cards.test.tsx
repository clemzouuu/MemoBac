import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CardList from '../CardList';
import CardForm from '../CardForm';
import { Card } from '../../../types/types';
import apiClient from '../../../api/apiClient';
import '@testing-library/jest-dom';

jest.mock('../../../api/apiClient');

const mockCards: Card[] = [
    { id: '1', question: 'Q1', answer: 'A1', tag: 'math', category: 'FIRST', userId: 'user1' }
];

describe('Card Management', () => {
    beforeEach(() => {
        (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCards });
        (apiClient.post as jest.Mock).mockResolvedValue({ data: mockCards[0] });
    });

    test('Display user cards with tags', async () => {
        render(<CardList />);

        await waitFor(() => {
            expect(screen.getByText('Q1')).toBeInTheDocument();
            expect(screen.getByText('math')).toBeInTheDocument();
        });
    });

    test('Create new card with validation', async () => {
        const mockCreate = jest.fn();
        render(<CardForm onCardCreated={mockCreate} />);

        fireEvent.change(screen.getByPlaceholderText('Question'), { target: { value: 'New Q' } });
        fireEvent.change(screen.getByPlaceholderText('Réponse'), { target: { value: 'New A' } });
        fireEvent.click(screen.getByText('Créer la fiche'));

        await waitFor(() => {
            expect(apiClient.post).toHaveBeenCalledWith('/cards', {
                question: 'New Q',
                answer: 'New A',
                tag: '',
                userId: undefined
            });
            expect(mockCreate).toHaveBeenCalled();
        });
    });
});