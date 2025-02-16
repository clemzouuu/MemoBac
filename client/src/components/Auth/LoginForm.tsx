import { useState } from 'react';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await apiClient.post('/auth/login', credentials);
            login(response.data.token);
            navigate('/'); // Redirection après succès
        } catch (error: any) {
            const errorMessage  = error.response?.data?.error || 'Erreur de connexion';
            setError(errorMessage );
            console.error('[LOGIN ERROR]', error.response);

            // Gestion des objets d'erreur
            if (typeof errorMessage === 'object') {
                setError('Nom d\'utilisateur ou mot de passe incorrect');
            } else {
                setError(errorMessage || 'Erreur de connexion');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;