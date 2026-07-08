import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { PaperNodeData, useCanvasStore } from "@/store/useCanvasStore";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function InputNode({ id, data }: { id: string, data: PaperNodeData }) {
  const [value, setValue] = useState("");
  const { submitInput } = useCanvasStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInput(id, value);
  };

  return (
    <div
      className={cn(
        "relative w-72 bg-manila text-charcoal p-4 shadow-xl border border-[#d6cbae]",
        "before:absolute before:inset-0 before:opacity-10 before:pointer-events-none",
        "before:bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"
      )}
      style={{
        transform: `rotate(${data.rotation || 0}deg)`,
      }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-charcoal border-2 border-manila" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-charcoal border-2 border-manila" />
      
      <div className="border-b-2 border-charcoal/20 pb-2 mb-3">
        <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-charcoal/80 flex items-center gap-2">
          <Search className="w-4 h-4" />
          {data.title}
        </h3>
      </div>

      <div className={cn("text-sm mb-4", data.type === "code" ? "font-mono text-xs" : "font-sans")}>
        {data.content}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={data.inputPlaceholder || "Enter value..."}
          className="flex-1 bg-white/50 border border-charcoal/20 px-2 py-1.5 text-sm font-mono focus:outline-none focus:border-charcoal/50"
        />
        <button
          type="submit"
          className="bg-charcoal text-manila px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-charcoal/80 transition-colors"
        >
          Run
        </button>
      </form>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-charcoal border-2 border-manila" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-charcoal border-2 border-manila" />
    </div>
  );
}
