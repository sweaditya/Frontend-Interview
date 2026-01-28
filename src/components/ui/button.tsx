import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-stone-900 text-amber-50 hover:bg-amber-700 shadow-brutal hover:shadow-none",
        destructive: "bg-red-600 text-white hover:bg-red-700 border-4 border-red-900",
        outline: "border-4 border-stone-900 bg-white hover:bg-stone-100",
        secondary: "bg-amber-600 text-stone-900 hover:bg-amber-700 border-4 border-stone-900",
        ghost: "hover:bg-stone-100",
      },
      size: {
        default: "px-8 py-4 text-sm",
        sm: "px-6 py-3 text-xs",
        lg: "px-10 py-5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
