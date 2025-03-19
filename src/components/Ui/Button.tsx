import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Audio } from 'react-loader-spinner'
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center hover:scale-[1.05] justify-center gap-2 whitespace-nowrap rounded-md text-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-secondaryGreen text-primaryBlack hover:bg-primary/90",
        destructive:
          "bg-destructive text-red-500 hover:border-red-500 hover:border",
        outline:
          "border border-primaryGreen bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border-2 border-primaryGreen text-primaryGreen hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        disabled: "bg-secondaryBlack border-secondaryGray text-secondaryGray cursor-not-allowed opacity-50",
        active: "text-primaryGreen bg-black border-2 border-primaryGreen hover:text-black hover:bg-primaryGreen",
        passive : "bg-zinc-800 text-white hover:bg-zinc-700"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 !text-lg rounded-md px-8",
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
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }),loading && "cursor-not-allowed opacity-70 hover:scale-100")}
        ref={ref}
        disabled={variant === "disabled" || props.disabled}
        {...props}
      >
        {loading ? (
          <Audio
            height="100"
            width="200"
            color="black"
            ariaLabel="loading"
          />
        ) : (
          props.children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
