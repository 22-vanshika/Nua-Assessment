import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-aurora-500 text-white hover:bg-aurora-600 active:bg-aurora-700 shadow-lg shadow-aurora-500/25 hover:shadow-xl hover:shadow-aurora-500/30 transform hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/25",
        outline:
          "border border-aurora-300 bg-background text-aurora-700 hover:bg-aurora-50 hover:text-aurora-800 hover:border-aurora-400",
        secondary:
          "bg-aurora-100 text-aurora-900 hover:bg-aurora-200 border border-aurora-200 hover:border-aurora-300",
        ghost: "text-aurora-600 hover:bg-aurora-50 hover:text-aurora-700 border border-transparent hover:border-aurora-200",
        link: "text-aurora-600 underline-offset-4 hover:underline hover:text-aurora-700",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
