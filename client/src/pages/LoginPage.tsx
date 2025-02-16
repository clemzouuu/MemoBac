import { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import Navbar from '../components/Layout/Navbar';
import './AuthPage.css';

const LoginPage = () => {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="auth-page">
            <Navbar />
            <div className="auth-container">
                <div className="auth-card">
                    <h2 className="auth-title">
                        {showRegister ? 'Créer un compte' : 'Bienvenue sur MemoBac!'}
                    </h2>
                    {showRegister ? <RegisterForm /> : <LoginForm />}
                    <button
                        onClick={() => setShowRegister(!showRegister)}
                        className="auth-switch"
                    >
                        {showRegister ? 'Déjà un compte ? Se connecter' : 'Créer un compte'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;