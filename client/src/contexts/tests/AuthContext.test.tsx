import { render, act, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import '@testing-library/jest-dom';

const TestComponent = () => {
    const { isAuthenticated, login, logout } = useAuth();
    return (
        <div>
            <span>{isAuthenticated ? 'LoggedIn' : 'LoggedOut'}</span>
            <button onClick={() => login('test-token')}>Login</button>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
};

describe('Auth Context', () => {
    test('Update auth state on login/logout', async () => {
        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(getByText('LoggedOut')).toBeInTheDocument();

        act(() => {
            fireEvent.click(getByText('Login'));
        });

        expect(getByText('LoggedIn')).toBeInTheDocument();
        expect(localStorage.getItem('token')).toBe('test-token');

        act(() => {
            fireEvent.click(getByText('Logout'));
        });

        expect(getByText('LoggedOut')).toBeInTheDocument();
        expect(localStorage.getItem('token')).toBeNull();
    });
});