import React, { useState } from 'react';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';
import LinkTo from '../atoms/LinkTo';

/**
 * RegisterForm Organism
 * The complete user registration form.
 */
export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login with:', { email, password });
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
          <Button type="submit">Login</Button>
        </div>
        <p className="text-center text-indigo-300 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <LinkTo to="/login">
            Register here
          </LinkTo>
        </p>
      </form>
  );
}
