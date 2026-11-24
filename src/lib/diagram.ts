export interface DiagramPoint {
  x: number;
  y: number;
}

export interface DiagramNode extends DiagramPoint {
  id: string;
  label: string;
  width: number;
  height: number;
  highlight?: boolean;
}

export interface DiagramEdge {
  from: string;
  to: string;
  points: readonly [DiagramPoint, DiagramPoint, ...DiagramPoint[]];
}

export function getDiagramPaths(
  nodes: readonly DiagramNode[],
  edges: readonly DiagramEdge[],
): { from: string; to: string; path: string }[] {
  const ids = new Set<string>();

  for (const node of nodes) {
    if (
      !node.id ||
      ids.has(node.id) ||
      ![node.x, node.y, node.width, node.height].every(Number.isFinite) ||
      node.width <= 0 ||
      node.height <= 0
    ) {
      throw new Error(`Invalid or duplicate diagram node: "${node.id}".`);
    }

    ids.add(node.id);
  }

  return edges.map((edge) => {
    if (!ids.has(edge.from) || !ids.has(edge.to)) {
      throw new Error(
        `Diagram edge references an unknown node: "${edge.from}" -> "${edge.to}".`,
      );
    }

    if (
      edge.points.some(
        (point) => !Number.isFinite(point.x) || !Number.isFinite(point.y),
      )
    ) {
      throw new Error('Diagram edge coordinates must be finite.');
    }

    return {
      from: edge.from,
      to: edge.to,
      path: edge.points
        .map(
          (point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`,
        )
        .join(' '),
    };
  });
}
