import { AnimatePresence } from "framer-motion";
import * as React from "react";

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

export function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  return (
    <AnimatePresence>
      {React.Children.map(children, child =>
        React.cloneElement(child as React.ReactElement, {
          key: Math.random(),
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { ease: "easeInOut", duration: 0.3, delay: 0.1 }
        })
      )}
    </AnimatePresence>
  );
}
