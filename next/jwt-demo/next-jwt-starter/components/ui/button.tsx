import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none px-3 py-2 border',
  {
    variants: {
      variant: {
        default: 'bg-black text-white border-transparent dark:bg-white dark:text-black',
        outline: 'bg-transparent border-gray-300 hover:bg-gray-50 dark:border-gray-700',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, className }))} {...props} />
  )
)
Button.displayName = 'Button'