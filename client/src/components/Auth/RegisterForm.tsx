import { useState } from 'react';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await apiClient.post('/auth/register', credentials);
            const loginResponse = await apiClient.post('/auth/login', credentials);
            login(loginResponse.data.token);
        } catch (error: any) {
            console.error('Registration failed:', error);
            const errorMessage = error.response?.data?.error;
            setError(typeof errorMessage === 'object'
                ? 'Nom d\'utilisateur déjà utilisé'
                : errorMessage || 'Erreur d\'inscription');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default RegisterForm;