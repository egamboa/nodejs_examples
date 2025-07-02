import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// Define the props, extending standard button props
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

/**
 * Button Atom
 * The primary call-to-action button for the application.
 */
export default function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  ...props 
}: ButtonProps) {
  const baseClasses = "w-full px-6 py-3 font-bold rounded-xl shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75";
  
  const variantClasses = {
    primary: 'bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-yellow-400',
    secondary: 'border border-white hover:bg-white hover:text-indigo-800 text-black focus:ring-white'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
