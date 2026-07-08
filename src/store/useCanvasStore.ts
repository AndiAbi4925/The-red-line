import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import { getLevelConfig } from "@/data/levelData";

export type PaperNodeData = {
  title: string;
  content: string;
  type: "text" | "image" | "code" | "input";
  imageUrl?: string;
  rotation?: number;
  inputPlaceholder?: string;
};

export type AppNode = Node<PaperNodeData>;

interface CanvasState {
  currentCaseId: string | null;
  nodes: AppNode[];
  edges: Edge[];
  isCompleted: boolean;
  loadCase: (caseId: string) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: AppNode) => void;
  setCompleted: (val: boolean) => void;
  submitInput: (nodeId: string, value: string) => void;
  reset: () => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  currentCaseId: null,
  nodes: [],
  edges: [],
  isCompleted: false,
  setCompleted: (val) => set({ isCompleted: val }),
  loadCase: (caseId) => {
    const config = getLevelConfig(caseId);
    set({
      currentCaseId: caseId,
      nodes: config.initialNodes,
      edges: [],
      isCompleted: false,
    });
  },
  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes) as AppNode[],
    }),
  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),
  onConnect: (connection) => {
    const edge = { ...connection, type: "redThread" };
    set({ edges: addEdge(edge, get().edges) });
    
    const { currentCaseId } = get();
    if (currentCaseId) {
      const config = getLevelConfig(currentCaseId);
      if (config.onConnect) {
        config.onConnect(connection.source, connection.target, get());
      }
    }
  },
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  submitInput: (nodeId, value) => {
    const { currentCaseId } = get();
    if (currentCaseId) {
      const config = getLevelConfig(currentCaseId);
      if (config.onInputSubmit) {
        config.onInputSubmit(nodeId, value, get());
      }
    }
  },
  reset: () => set({ nodes: [], edges: [], isCompleted: false, currentCaseId: null }),
}));
