import { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import Navbar from '../components/Layout/Navbar';

const LoginPage = () => {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div>
            <Navbar />
            <h2>{showRegister ? 'Register' : 'Login'}</h2>
            {showRegister ? <RegisterForm /> : <LoginForm />}
            <button onClick={() => setShowRegister(!showRegister)}>
                {showRegister ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
        </div>
    );
};

export default LoginPage;