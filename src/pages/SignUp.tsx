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
        <section className="m-8 flex gap-4">
            <div className="w-full mt-24">
                <div className="text-center">
                    <h2 className="font-bold text-3xl mb-4">Create Account</h2>
                    <p className="text-lg text-gray-600">Enter your details to create a new account.</p>
                </div>
                <form onSubmit={onSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="name@mail.com"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-900"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm font-bold">{errorMessage}</p>}
                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className={`mt-2 py-2 rounded-lg text-white font-medium ${isSigningUp ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {isSigningUp ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <p className="text-center text-gray-500 mt-2">
                        Already have an account?{' '}
                        <Link to="/sign-in" className="text-gray-900 font-medium">Sign In</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default SignUp;