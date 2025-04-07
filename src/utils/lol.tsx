import concaveman from "concaveman";

export function getOuterBoundary(walls: number[][]): [number, number][] {
  const points: [number, number][] = [];

  for (const wall of walls) {
    if (wall.length !== 4) continue; // skip malformed walls
    const [x1, y1, x2, y2] = wall;
    points.push([x1, y1]);
    points.push([x2, y2]);
  }

  // Deduplicate points
  const seen = new Set<string>();
  const uniquePoints = points.filter(([x, y]) => {
    const key = `${x},${y}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Need at least 3 points to form a boundary
  if (uniquePoints.length < 3) return [];

  //@ts-ignore
  return concaveman(uniquePoints);
  //@ts-check
}
