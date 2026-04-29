import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';

function SignUp() {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (!isSigningUp) {
            setIsSigningUp(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (err) {
                setErrorMessage('Failed to create account');
            } finally {
                setIsSigningUp(false);
            }
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex justify-center">
            <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #1f2937', padding: '40px', width: '100%', maxWidth: '600px', marginTop: '20px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '24px' }}>Create Account</h2>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '24px', padding: '40px' }}>
                    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <label style={{ fontSize: '20px', width: '160px', textAlign: 'right' }}>Email:</label>
                            <input
                                type="email"
                                placeholder="name@mail.com"
                                style={{ borderRadius: '999px', border: '1px solid #1f2937', padding: '8px 24px', width: '250px', backgroundColor: 'white' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <label style={{ fontSize: '20px', width: '160px', textAlign: 'right' }}>Password:</label>
                            <input
                                type="password"
                                placeholder="********"
                                style={{ borderRadius: '999px', border: '1px solid #1f2937', padding: '8px 24px', width: '250px', backgroundColor: 'white' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <label style={{ fontSize: '20px', width: '160px', textAlign: 'right' }}>Confirm Password:</label>
                            <input
                                type="password"
                                placeholder="********"
                                style={{ borderRadius: '999px', border: '1px solid #1f2937', padding: '8px 24px', width: '250px', backgroundColor: 'white' }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
                        <button
                            type="submit"
                            disabled={isSigningUp}
                            style={{ borderRadius: '999px', border: '1px solid #1f2937', padding: '8px 32px', backgroundColor: '#f5f0e8', cursor: isSigningUp ? 'not-allowed' : 'pointer' }}
                        >
                            {isSigningUp ? 'Creating Account...' : 'Create Account'}
                        </button>
                        <Link to="/sign-in" style={{ textDecoration: 'underline', color: '#1f2937', fontSize: '14px' }}>
                            Already have an account? Sign In
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;