import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Case } from "@/data/cases";

interface CaseIntroProps {
  caseData: Case;
  onStart: () => void;
}

export default function CaseIntro({ caseData, onStart }: CaseIntroProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showButton, setShowButton] = useState(false);
  
  const textToType = `CASE FILE: ${caseData.id.toUpperCase()}\nTITLE: ${caseData.title}\n\n${caseData.description}`;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < textToType.length) {
        setDisplayedText((prev) => prev + textToType.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 30); // Faster typing speed
    
    return () => clearInterval(typingInterval);
  }, [textToType]);

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_4px] opacity-10 pointer-events-none" />
      
      <div className="max-w-2xl w-full z-10 relative min-h-[300px] flex flex-col items-start justify-center">
        <p className="font-mono text-typewriter text-xl leading-relaxed mb-12 min-h-[120px] whitespace-pre-wrap">
          {displayedText}
          <span className="typewriter-cursor inline-block w-3 h-5 bg-typewriter align-middle ml-1" />
        </p>
        
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={onStart}
            className="self-center mt-8 px-8 py-3 font-mono text-charcoal bg-manila border border-manila hover:bg-manila/90 transition-all text-sm tracking-widest uppercase font-bold shadow-[0_0_15px_rgba(244,235,208,0.3)]"
          >
            Start Investigation
          </motion.button>
        )}
      </div>
    </div>
  );
}
