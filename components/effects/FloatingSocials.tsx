"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

const socials = [
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    link: "#",
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    link: "#",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    link: "#",
  },
  {
    icon: <HiOutlineDocumentText />,
    label: "Resume",
    link: "#",
  },
];

export default function FloatingSocials() {
  return (
    <div className="absolute right-6 top-1/3 hidden md:flex flex-col gap-4 z-20">
      {socials.map((item, i) => (
        <motion.a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-4 py-2 rounded-full 
          bg-white/5 backdrop-blur-xl border border-white/10 
          text-gray-300 hover:text-white transition-all duration-300
          shadow-lg hover:shadow-cyan-500/20"
        >
          {/* ICON */}
          <span className="text-lg text-cyan-400 group-hover:text-cyan-300">
            {item.icon}
          </span>

          {/* TEXT */}
          <span className="text-sm tracking-wide opacity-80 group-hover:opacity-100">
            {item.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
