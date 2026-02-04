"use client";
import { motion } from "framer-motion";

export const Reveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center"
    >
      {children}
    </motion.section>
  );
};