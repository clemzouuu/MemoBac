import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav>
            <Link to="/">MemoBac</Link>
            {isAuthenticated && (
                <div>
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;