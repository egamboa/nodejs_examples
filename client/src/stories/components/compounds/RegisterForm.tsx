import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';

/**
 * RegisterForm Organism
 * The complete user registration form.
 */
export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Registering with:', { email, password });
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-800 bg-opacity-50 shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="ash@ketchum.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="mt-6">
          <Button type="submit">Create Account</Button>
        </div>
        <p className="text-center text-indigo-300 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-yellow-300 hover:text-yellow-400">
            Login here
          </Link>
        </p>
      </form>
  );
}
