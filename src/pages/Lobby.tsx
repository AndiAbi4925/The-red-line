import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background noise/texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <h1 className="text-6xl md:text-8xl font-mono font-bold tracking-[0.2em] text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] text-center mb-16">
          THE RED LINE
        </h1>

        <motion.button
          onClick={() => navigate("/menu")}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(201, 42, 42, 0.4)",
              "0 0 0 20px rgba(201, 42, 42, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="px-8 py-4 bg-transparent border border-crimson text-crimson font-sans uppercase tracking-widest text-sm hover:bg-crimson hover:text-white transition-colors duration-500"
        >
          Enter the Archives
        </motion.button>
      </motion.div>
    </div>
  );
}
