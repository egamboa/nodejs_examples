import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement login logic (e.g., API call)
    console.log('Login attempt with:', { email, password });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600 text-white flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Login to <span className="text-yellow-300"><Link to={'/'}>Pokémon Finder</Link></span>
          </h1>
          <p className="mt-2 text-indigo-200">Welcome back, trainer!</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-indigo-800 bg-opacity-50 shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-indigo-200 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ash@ketchum.com"
              className="shadow-inner appearance-none border border-indigo-700 rounded-xl w-full py-3 px-4 bg-indigo-900 bg-opacity-75 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-indigo-200 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="shadow-inner appearance-none border border-indigo-700 rounded-xl w-full py-3 px-4 bg-indigo-900 bg-opacity-75 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            >
              Login
            </button>
          </div>
            <p className="text-center text-indigo-300 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-bold text-yellow-300 hover:text-yellow-400">
              Register here
            </Link>
            </p>
        </form>
      </div>
    </main>
  );
}
