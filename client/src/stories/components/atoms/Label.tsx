import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// Define the props, extending standard label props
interface LabelProps extends ComponentPropsWithoutRef<'label'> {
    children: ReactNode;
}

/**
 * Label Atom
 * A styled label for form inputs.
 */
export default function Label({ children, className = '', ...props }: LabelProps) {
    const baseClasses = "block text-indigo-200 text-sm font-bold mb-2";

    return (
        <label className={`${baseClasses} ${className}`} {...props}>
            {children}
        </label>
    );
}
