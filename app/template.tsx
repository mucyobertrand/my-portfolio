"use client";

import { motion } from "motion/react";

// Runs on every route change: an accent curtain lifts off the new page.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
