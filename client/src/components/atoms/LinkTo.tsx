import { Link, type LinkProps } from 'react-router-dom'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import Button from './Button'

interface LinkToProps extends LinkProps {
  children: ReactNode
  className?: string
  asButton?: boolean
  buttonClassName?: string
  buttonVariant?: 'primary' | 'secondary'
}

export default function LinkTo({
  children,
  className = '',
  asButton = false,
  buttonClassName = '',
  buttonVariant = 'primary',
  ...props
}: LinkToProps) {
  return (
    <Link
      {...props}
      className={clsx(
        'font-bold text-yellow-300 hover:text-yellow-500 hover:underline',
        asButton ? '' : className,
      )}
    >
      {asButton ? (
        <Button
          variant={buttonVariant}
          className={clsx(buttonClassName)}
        >
          {children}
        </Button>
      ) : (
        children
      )}
    </Link>
  )
}
