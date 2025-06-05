import { cn, sectionVariants, type SectionVariants, type ContainerVariants } from "@/lib/utils"
import { type ReactNode } from "react"
import { Container } from "./container"

interface SectionProps extends SectionVariants {
  children: ReactNode
  className?: string | undefined
  containerClassName?: string
  containerSize?: ContainerVariants['size']
  containerPadding?: ContainerVariants['padding']
  id?: string
}

export function Section({ 
  children, 
  className,
  containerClassName,
  containerSize = 'xl',
  containerPadding = 'md',
  spacing = 'md',
  background = 'transparent',
  id
}: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        sectionVariants({ spacing, background }),
        className
      )}
    >
      <Container 
        size={containerSize} 
        padding={containerPadding}
        className={containerClassName}
      >
        {children}
      </Container>
    </section>
  )
} 