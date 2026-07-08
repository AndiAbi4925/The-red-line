import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { useCanvasStore } from "@/store/useCanvasStore";
import { useAppStore } from "@/store/useAppStore";
import { getEpilogue } from "@/data/epilogues";

export default function Epilogue() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [displayedText, setDisplayedText] = useState("");
  const [showStamp, setShowStamp] = useState(false);
  const { setCompleted } = useCanvasStore();
  const { markCaseSolved } = useAppStore();

  const caseId = searchParams.get("caseId") || "default";
  const TEXT = getEpilogue(caseId);

  useEffect(() => {
    if (caseId && caseId !== "default") {
      markCaseSolved(caseId);
    }
  }, [caseId, markCaseSolved]);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < TEXT.length) {
        setDisplayedText((prev) => prev + TEXT.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowStamp(true), 1000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_4px] opacity-10 pointer-events-none" />

      <div className="max-w-2xl w-full z-10 relative min-h-[300px] flex flex-col items-center justify-center">
        <p className="font-mono text-typewriter text-xl md:text-2xl leading-relaxed mb-12 text-center min-h-[120px]">
          {displayedText}
          <span className="typewriter-cursor inline-block w-3 h-6 bg-typewriter align-middle ml-1" />
        </p>

        {showStamp && (
          <motion.div
            initial={{ scale: 2, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="mb-16"
          >
            <div className="border-4 border-crimson text-crimson text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase px-8 py-4 opacity-90 filter drop-shadow-[0_0_10px_rgba(201,42,42,0.3)]">
              CASE CLOSED
            </div>
          </motion.div>
        )}

        {showStamp && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            onClick={() => {
              setCompleted(false);
              navigate("/menu");
            }}
            className="px-6 py-3 font-mono text-white/50 border border-white/20 hover:text-white hover:border-white hover:bg-white/5 transition-all text-sm tracking-widest uppercase"
          >
            Return to Archives
          </motion.button>
        )}
      </div>
    </div>
  );
}
