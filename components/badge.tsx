import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "border-transparent bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 backdrop-blur-sm shadow-sm",
        secondary:
          "border-transparent bg-white/30 dark:bg-black/30 text-secondary-foreground hover:bg-secondary/80 backdrop-blur-sm",
        destructive:
          "border-transparent bg-destructive/20 text-destructive-foreground hover:bg-destructive/80 backdrop-blur-sm",
        outline: "text-foreground border-yellow-500/30 bg-white/20 dark:bg-black/20 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
