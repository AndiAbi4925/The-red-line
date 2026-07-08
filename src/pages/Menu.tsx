import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FolderClosed, Lock, FolderOpen, CheckCircle } from "lucide-react";
import { CASES } from "@/data/cases";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

export default function Menu() {
  const navigate = useNavigate();
  const { isCaseSolved } = useAppStore();

  return (
    <div className="min-h-screen bg-charcoal p-8 md:p-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto z-10 relative"
      >
        <header className="mb-12 border-b border-white/10 pb-6 flex items-baseline justify-between">
          <h1 className="text-3xl font-mono text-white/80 tracking-widest uppercase">
            Archive.DB
          </h1>
          <span className="font-mono text-typewriter text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-typewriter animate-pulse" />
            SYSTEM ONLINE
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c, i) => {
            const isSolved = isCaseSolved(c.id);
            const isPreviousSolved = i === 0 || isCaseSolved(CASES[i - 1].id);
            
            let status = c.status;
            if (isSolved) {
              status = "solved";
            } else if (isPreviousSolved) {
              status = "unsolved";
            } else {
              status = "locked";
            }

            const isLocked = status === "locked";
            
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => !isLocked && navigate(`/canvas/${c.id}`)}
                className={cn(
                  "p-6 rounded-sm border transition-all duration-300 relative group flex flex-col",
                  isLocked 
                    ? "border-white/5 bg-white/5 opacity-60 cursor-not-allowed" 
                    : isSolved 
                      ? "border-typewriter/30 bg-typewriter/5 hover:bg-typewriter/10 hover:border-typewriter/50 cursor-pointer" 
                      : "border-[#d6cbae]/30 bg-manila/5 hover:bg-manila/10 hover:border-manila/50 cursor-pointer"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  {isLocked ? (
                    <FolderClosed className="w-8 h-8 text-white/40" />
                  ) : isSolved ? (
                    <CheckCircle className="w-8 h-8 text-typewriter" />
                  ) : (
                    <FolderOpen className="w-8 h-8 text-manila" />
                  )}
                  {isLocked && <Lock className="w-4 h-4 text-white/20" />}
                  {status === "unsolved" && (
                    <span className="text-xs font-mono px-2 py-1 bg-crimson/20 text-crimson border border-crimson/30 rounded uppercase">
                      Unsolved
                    </span>
                  )}
                  {status === "solved" && (
                    <span className="text-xs font-mono px-2 py-1 bg-typewriter/20 text-typewriter border border-typewriter/30 rounded uppercase">
                      Solved
                    </span>
                  )}
                </div>
                
                <h3 className={cn(
                  "font-sans font-bold text-lg mb-2 leading-tight",
                  isLocked ? "text-white/50" : isSolved ? "text-typewriter" : "text-manila"
                )}>
                  {c.title}
                </h3>
                
                <p className="font-mono text-xs text-white/40 line-clamp-3 mt-auto">
                  {isLocked ? "ENCRYPTED FILE. ACCESS DENIED." : c.description}
                </p>
                
                {/* Decorative folder tab */}
                <div className={cn(
                  "absolute -top-3 left-4 px-3 py-1 text-[10px] font-mono tracking-widest uppercase border-t border-l border-r rounded-t-sm",
                  isLocked 
                    ? "bg-charcoal border-white/5 text-white/30" 
                    : isSolved 
                      ? "bg-charcoal border-typewriter/30 text-typewriter/70"
                      : "bg-charcoal border-[#d6cbae]/30 text-manila/70"
                )}>
                  {c.id.replace('-', '')}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
