import { Link, type LinkProps } from 'react-router-dom'
import type { ReactNode } from 'react'

interface LinkToProps extends LinkProps {
  children: ReactNode
  className?: string
}

export default function LinkTo({ children, className = '', ...props }: LinkToProps) {
  return (
    <Link
      {...props}
      className={`font-bold text-yellow-300 hover:text-yellow-500 ${className}`}
    >
      {children}
    </Link>
  )
}