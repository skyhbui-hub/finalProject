import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';

function SignIn() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (err) {
        setErrorMessage('Failed to sign in');
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
      <div className="!bg-white rounded-3xl border border-gray-800 p-10 w-full max-w-2xl shadow-sm">
        <h2 className="text-center text-2xl font-semibold mb-6">Sign In</h2>
        <div className="bg-gray-200 rounded-3xl p-10">
          <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 w-full justify-center">
              <label className="text-xl font-medium w-36 text-right">Username:</label>
              <input
                type="email"
                className="rounded-full border border-gray-800 px-6 py-2 w-64 bg-white shadow-inner focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-4 w-full justify-center">
              <label className="text-xl font-medium w-36 text-right">Password:</label>
              <input
                type="password"
                className="rounded-full border border-gray-800 px-6 py-2 w-64 bg-white shadow-inner focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button
              type="submit"
              disabled={isSigningIn}
              className="rounded-full border border-gray-800 px-8 py-2 bg-[#f5f0e8] hover:bg-gray-300 transition"
            >
              {isSigningIn ? 'Signing In...' : 'Login'}
            </button>
            <Link to="/sign-up" className="underline text-gray-800 text-sm">
              create new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;