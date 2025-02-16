import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import '@testing-library/jest-dom';

test('affiche le formulaire de connexion par défaut', () => {
    render(
        <AuthProvider>
            <App />
        </AuthProvider>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('affiche le bouton de création de compte', () => {
    render(
        <AuthProvider>
            <App />
        </AuthProvider>
    );

    expect(screen.getByRole('button', { name: /créer un compte/i })).toBeInTheDocument();
});