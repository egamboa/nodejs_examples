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
  const baseClasses = "w-full hover:text-white text-black px-6 py-3 border font-bold rounded-xl shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75";
  
  const variantClasses = {
    primary: 'bg-yellow-400 hover:bg-black focus:ring-yellow-400',
    secondary: 'bg-white hover:bg-black focus:ring-white'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
