import { BaseEdge, EdgeProps, getBezierPath } from "@xyflow/react";

export default function RedThreadEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        ...style,
        strokeWidth: 4,
        stroke: "var(--color-crimson)",
        filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))",
        strokeLinecap: "round",
      }}
    />
  );
}
