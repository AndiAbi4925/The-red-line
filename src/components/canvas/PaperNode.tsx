import { Handle, Position } from "@xyflow/react";
import { PaperNodeData } from "@/store/useCanvasStore";
import { cn } from "@/lib/utils";

export default function PaperNode({ data }: { data: PaperNodeData }) {
  return (
    <div
      className={cn(
        "relative w-64 bg-manila text-charcoal p-4 shadow-xl border border-[#d6cbae]",
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
        <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-charcoal/80">
          {data.title}
        </h3>
      </div>

      <div className={cn("text-sm", data.type === "code" ? "font-mono text-xs whitespace-pre-wrap" : "font-sans")}>
        {data.content}
      </div>

      {data.imageUrl && (
        <div className="mt-3 border-2 border-white shadow-sm transform -rotate-1">
          <img src={data.imageUrl} alt={data.title} className="w-full h-auto grayscale contrast-125 sepia-[.3]" />
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-charcoal border-2 border-manila" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-charcoal border-2 border-manila" />
    </div>
  );
}
