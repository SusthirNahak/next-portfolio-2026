"use client";

import { motion } from "framer-motion";

export function StaggerContainer({ children }: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: any) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
