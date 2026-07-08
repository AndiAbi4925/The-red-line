import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ReactFlow, 
  Background, 
  BackgroundVariant,
  Controls,
  useReactFlow,
  ReactFlowProvider
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import { useCanvasStore } from "@/store/useCanvasStore";
import PaperNode from "@/components/canvas/PaperNode";
import InputNode from "@/components/canvas/InputNode";
import RedThreadEdge from "@/components/canvas/RedThreadEdge";
import CaseIntro from "@/components/canvas/CaseIntro";
import { CASES } from "@/data/cases";
import { Lightbulb, ArrowLeft } from "lucide-react";

const nodeTypes = {
  paper: PaperNode,
  input: InputNode,
};

const edgeTypes = {
  redThread: RedThreadEdge,
};

function CanvasInner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, isCompleted, setCompleted, reset, loadCase } = useCanvasStore();
  const { fitView } = useReactFlow();
  
  const [showIntro, setShowIntro] = useState(true);
  const currentCase = CASES.find(c => c.id === id);

  useEffect(() => {
    reset();
    if (id) {
      loadCase(id);
    }
  }, [id, reset, loadCase]);

  // Route to epilogue on completion
  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        navigate(`/epilogue?caseId=${id}`);
      }, 2000);
    }
  }, [navigate, isCompleted, id]);

  // Initial fit view
  useEffect(() => {
    if (!showIntro) {
      setTimeout(() => {
        fitView({ padding: 0.2 });
      }, 100);
    }
  }, [fitView, showIntro]);

  return (
    <div className="h-screen w-screen bg-corkboard relative">
      {showIntro && currentCase && (
        <CaseIntro caseData={currentCase} onStart={() => setShowIntro(false)} />
      )}
      <header className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-charcoal/80 to-transparent pointer-events-none">
        <button 
          onClick={() => navigate("/menu")}
          className="pointer-events-auto text-manila/80 hover:text-manila flex items-center gap-2 font-mono text-sm transition-colors bg-charcoal/50 px-3 py-1.5 rounded-sm border border-manila/20"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO ARCHIVES
        </button>
        <div className="font-mono text-typewriter bg-charcoal/80 px-4 py-1.5 rounded-sm border border-typewriter/30 text-xs tracking-widest uppercase">
          {id} : ACTIVE
        </div>
      </header>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-corkboard"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#1a1a1a" />
        <Controls className="bg-charcoal border-white/10 fill-manila text-manila" />
      </ReactFlow>

      {/* Clue Button */}
      <button 
        className="absolute bottom-8 right-8 z-10 w-14 h-14 bg-charcoal border-2 border-[#d6cbae]/50 rounded-full flex items-center justify-center text-manila hover:bg-[#d6cbae]/10 hover:shadow-[0_0_20px_rgba(244,235,208,0.2)] transition-all cursor-pointer group"
        onClick={async () => {
          try {
            const res = await fetch("/api/clue", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ caseId: id, nodes, edges })
            });
            const data = await res.json();
            if (data.clue) {
              alert("System AI Override:\\n\\n" + data.clue);
            }
          } catch (e) {
            console.error(e);
            alert("Connection to AI core failed.");
          }
        }}
      >
        <Lightbulb className="w-6 h-6 group-hover:text-typewriter transition-colors" />
      </button>

      {/* Completion Toast */}
      {isCompleted && (
        <div className="absolute inset-0 bg-charcoal/80 z-50 flex items-center justify-center">
          <div className="font-mono text-typewriter text-2xl border border-typewriter px-8 py-4 bg-charcoal/90 tracking-[0.2em] shadow-[0_0_30px_rgba(74,246,38,0.2)]">
            CONNECTION VALIDATED
          </div>
        </div>
      )}
    </div>
  );
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
