"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  noVertical?: boolean;
  delay?: number;
}

export function FadeIn({
  children,
  className,
  noVertical,
  delay,
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: noVertical ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay: delay ?? 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
