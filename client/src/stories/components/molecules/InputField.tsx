import type { ComponentPropsWithoutRef } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

// Define the props
interface InputFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  id: string;
}

/**
 * InputField Molecule
 * Combines a Label and an Input into a complete form field.
 */
export default function InputField({ label, id, ...props }: InputFieldProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}
