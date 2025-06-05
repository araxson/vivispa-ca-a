import { cn, containerVariants, type ContainerVariants } from "@/lib/utils"
import { type ReactNode } from "react"

interface ContainerProps extends ContainerVariants {
  children: ReactNode
  className?: string
}

export function Container({ 
  children, 
  className, 
  size = 'xl', 
  padding = 'md' 
}: ContainerProps) {
  return (
    <div className={cn(
      containerVariants({ size, padding }),
      className
    )}>
      {children}
    </div>
  )
} 