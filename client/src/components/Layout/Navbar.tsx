import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Fichier CSS dédié

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="logo">
                    <span role="img" aria-label="brain">🧠</span>
                    <span className="logo-text">MemoBac</span>
                </Link>
            </div>

            {isAuthenticated && (
                <div className="nav-items">
                    <Link to="/quiz" className="nav-link">
                        <span role="img" aria-label="quiz">📝</span>
                        Quiz du jour
                    </Link>
                    <button onClick={logout} className="logout-button">
                        <span role="img" aria-label="logout">🚪</span>
                        Déconnexion
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;