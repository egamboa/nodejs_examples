import type { ComponentPropsWithoutRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'>;

export default function Input({ className = '', ...props }: InputProps) {
  const baseClasses = "shadow-inner appearance-none border border-indigo-500 rounded-xl w-full py-3 px-4 bg-indigo-900 bg-opacity-75 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400";
  
  return (
    <input className={`${baseClasses} ${className}`} {...props} />
  );
}
