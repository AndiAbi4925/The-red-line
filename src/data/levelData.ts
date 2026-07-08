import { AppNode } from "@/store/useCanvasStore";

export interface LevelConfig {
  initialNodes: AppNode[];
  onConnect?: (source: string, target: string, store: any) => void;
  onInputSubmit?: (nodeId: string, value: string, store: any) => void;
  checkCompletion?: (store: any) => boolean;
}

export const LEVELS: Record<string, LevelConfig> = {
  "case-1": {
    initialNodes: [
      {
        id: "log-ugd",
        type: "paper",
        position: { x: 100, y: 100 },
        data: {
          title: "UGD Server Log",
          content: "02:00 AM - CRITICAL - Ransomware Payload Executed\n01:59 AM - Ingress Connection from: 192.168.1.15\n01:55 AM - Normal traffic from 10.0.0.5",
          type: "code",
          rotation: -2,
        },
      },
      {
        id: "trace-input",
        type: "input",
        position: { x: 500, y: 150 },
        data: {
          title: "IP Tracer Tool",
          content: "Enter suspect IP address to trace source:",
          type: "text",
          inputPlaceholder: "e.g. 10.0.0.1",
          rotation: 1,
        },
      },
    ],
    onInputSubmit: (nodeId, value, store) => {
      if (nodeId === "trace-input" && value.trim() === "192.168.1.15") {
        if (!store.nodes.find((n: AppNode) => n.id === "router-arsip")) {
          store.addNode({
            id: "router-arsip",
            type: "paper",
            position: { x: 200, y: 400 },
            data: {
              title: "Router Arsip Log",
              content: "MAC Address: AA:BB:CC:DD\nConnected to UGD Server at 01:59 AM.",
              type: "code",
              rotation: -1,
            },
          });
          store.addNode({
            id: "door-log",
            type: "paper",
            position: { x: 600, y: 450 },
            data: {
              title: "Door Access: Ruang Arsip",
              content: "01:58 AM - Access Granted - ID: 9021 (IT Admin: Alex M.)\n04:00 AM - Access Granted - ID: 1022 (Janitor)",
              type: "text",
              rotation: 2,
            },
          });
        }
      } else if (nodeId === "trace-input") {
        alert("Trace failed. Invalid IP or no malicious activity detected on this IP.");
      }
    },
    onConnect: (source, target, store) => {
      if (
        (source === "router-arsip" && target === "door-log") ||
        (source === "door-log" && target === "router-arsip")
      ) {
        store.setCompleted(true);
      }
    },
  },
  "case-2": {
    initialNodes: [
      {
        id: "audio-spec",
        type: "paper",
        position: { x: 150, y: 100 },
        data: {
          title: "CEO Call Spectrogram",
          content: "Voice matches CEO profile: 99.8%\nAnomaly detected at 00:12\nFrequency drop indicates digital splicing.",
          type: "text",
          rotation: -1,
        },
      },
      {
        id: "glitch-input",
        type: "input",
        position: { x: 500, y: 150 },
        data: {
          title: "Audio Forensics",
          content: "Enter timestamp of digital glitch (in seconds):",
          type: "text",
          inputPlaceholder: "e.g. 5",
          rotation: 3,
        },
      },
    ],
    onInputSubmit: (nodeId, value, store) => {
      if (nodeId === "glitch-input" && value.trim() === "12") {
        if (!store.nodes.find((n: AppNode) => n.id === "synth-log")) {
          store.addNode({
            id: "synth-log",
            type: "paper",
            position: { x: 200, y: 350 },
            data: {
              title: "Synth Software Log",
              content: "Task: DeepVoice Gen\nTimestamp: matches call\nOperator IP: Internal-VLAN-4",
              type: "code",
              rotation: -2,
            },
          });
          store.addNode({
            id: "transfer-log",
            type: "paper",
            position: { x: 600, y: 380 },
            data: {
              title: "Bank Transfer",
              content: "Amount: $5,000,000\nAuth: CEO Voice\nRecipient: Cayman Acct 7788 (Registered to VP of Finance)",
              type: "text",
              rotation: 1,
            },
          });
        }
      } else if (nodeId === "glitch-input") {
        alert("Forensics failed. No anomaly found at that timestamp.");
      }
    },
    onConnect: (source, target, store) => {
      if (
        (source === "synth-log" && target === "transfer-log") ||
        (source === "transfer-log" && target === "synth-log")
      ) {
        store.setCompleted(true);
      }
    },
  },
  "case-3": {
    initialNodes: [
      {
        id: "scada-log",
        type: "paper",
        position: { x: 100, y: 150 },
        data: {
          title: "SCADA Traffic System",
          content: "Intersection 1: Normal\nIntersection 2: Normal\nIntersection 3: Normal\nIntersection 4 (Bank): Red Light 180s Anomaly\nIntersection 5: Normal",
          type: "code",
          rotation: -1,
        },
      },
      {
        id: "intersection-input",
        type: "input",
        position: { x: 450, y: 200 },
        data: {
          title: "Traffic Camera DB",
          content: "Enter anomalous intersection ID to pull feed:",
          type: "text",
          inputPlaceholder: "e.g. 1",
          rotation: 2,
        },
      },
    ],
    onInputSubmit: (nodeId, value, store) => {
      if (nodeId === "intersection-input" && value.trim() === "4") {
        if (!store.nodes.find((n: AppNode) => n.id === "plate-input")) {
          store.addNode({
            id: "dashcam-img",
            type: "paper",
            position: { x: 200, y: 400 },
            data: {
              title: "Dashcam Snapshot",
              content: "Black van blocking intersection.\nPlate visible: B 1234 XYZ",
              type: "text",
              rotation: -3,
            },
          });
          store.addNode({
            id: "plate-input",
            type: "input",
            position: { x: 550, y: 450 },
            data: {
              title: "DMV Database",
              content: "Enter suspect vehicle plate number:",
              type: "text",
              inputPlaceholder: "e.g. A 123 B",
              rotation: 1,
            },
          });
        }
      } else if (nodeId === "intersection-input") {
        alert("Camera feed unavailable or intersection normal.");
      } else if (nodeId === "plate-input" && value.replace(/\s+/g, '').toUpperCase() === "B1234XYZ") {
        if (!store.nodes.find((n: AppNode) => n.id === "rf-tracker")) {
          store.addNode({
            id: "rf-tracker",
            type: "paper",
            position: { x: 300, y: 650 },
            data: {
              title: "RF Triangulation",
              content: "Signal 433 MHz detected near Bank.\nOrigin: Roof of adjacent building.\nHack confirmed.",
              type: "code",
              rotation: -2,
            },
          });
        }
      } else if (nodeId === "plate-input") {
        alert("Plate not found in criminal database or format incorrect.");
      }
    },
    onConnect: (source, target, store) => {
      if (
        (source === "dashcam-img" && target === "rf-tracker") ||
        (source === "rf-tracker" && target === "dashcam-img") ||
        (source === "scada-log" && target === "rf-tracker") ||
        (source === "rf-tracker" && target === "scada-log")
      ) {
        store.setCompleted(true);
      }
    },
  },
};

// Default fallback for cases not fully implemented
export const getLevelConfig = (caseId: string): LevelConfig => {
  if (LEVELS[caseId]) return LEVELS[caseId];

  return {
    initialNodes: [
      {
        id: "clue-1",
        type: "paper",
        position: { x: 200, y: 200 },
        data: {
          title: "Encrypted Evidence",
          content: `Data for ${caseId} is still being decrypted. Connect this to the central node to bypass.`,
          type: "text",
        },
      },
      {
        id: "central-node",
        type: "paper",
        position: { x: 600, y: 250 },
        data: {
          title: "Central Node",
          content: "Awaiting manual override connection.",
          type: "text",
        },
      },
    ],
    onConnect: (source, target, store) => {
      if (
        (source === "clue-1" && target === "central-node") ||
        (source === "central-node" && target === "clue-1")
      ) {
        store.setCompleted(true);
      }
    },
  };
};
