import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface LabelProps extends ComponentPropsWithoutRef<'label'> {
    children: ReactNode;
}

export default function Label({ children, className = '', ...props }: LabelProps) {
    const baseClasses = "block text-indigo-200 text-sm font-bold mb-2";

    return (
        <label className={`${baseClasses} ${className}`} {...props}>
            {children}
        </label>
    );
}
