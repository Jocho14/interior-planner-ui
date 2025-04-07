import { useSketch } from "@/context/SketchContext";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import {
  BufferAttribute,
  ExtrudeGeometry,
  RepeatWrapping,
  Shape,
  TextureLoader,
} from "three";

const findCycles = (
  graph: Map<string, Set<string>>,
  maxLength = 20
): string[][] => {
  const cycles: string[][] = [];

  function dfs(
    start: string,
    current: string,
    visited: Set<string>,
    path: string[]
  ) {
    if (path.length > maxLength) return;

    visited.add(current);
    path.push(current);

    for (const neighbor of graph.get(current) || []) {
      if (neighbor === start && path.length > 2) {
        cycles.push([...path]);
      } else if (!visited.has(neighbor)) {
        dfs(start, neighbor, new Set(visited), [...path]);
      }
    }
  }

  for (const node of graph.keys()) {
    dfs(node, node, new Set(), []);
  }

  return cycles;
};

const parsePoint = (point: string): [number, number] => {
  return point.split(",").map(Number) as [number, number];
};

const polygonArea = (points: string[]): number => {
  const coords = points.map(parsePoint);
  let area = 0;
  for (let i = 0; i < coords.length; i++) {
    const [x1, y1] = coords[i];
    const [x2, y2] = coords[(i + 1) % coords.length];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area / 2);
};

export const getLargestCycle = (walls: number[][]): string[] | null => {
  const graph = new Map<string, Set<string>>();

  for (const [x1, y1, x2, y2] of walls) {
    const p1 = `${x1},${y1}`;
    const p2 = `${x2},${y2}`;

    if (!graph.has(p1)) graph.set(p1, new Set());
    if (!graph.has(p2)) graph.set(p2, new Set());

    graph.get(p1)!.add(p2);
    graph.get(p2)!.add(p1);
  }

  const allCycles = findCycles(graph, 20);

  if (allCycles.length === 0) return null;

  allCycles.sort((a, b) => polygonArea(b) - polygonArea(a));
  return allCycles[0];
};

const Floor: React.FC = () => {
  const { walls } = useSketch();

  const stringPoints = getLargestCycle(walls);
  if (!stringPoints) return;

  const points = useMemo(() => {
    return stringPoints.map((point) => {
      const [x, y] = point.split(",").map(Number);
      return [x / 10, y / 10];
    });
  }, [stringPoints]);

  const shape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(points[0][0], points[0][1]);

    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }

    shape.closePath();

    return shape;
  }, [points]);

  const geometry = useMemo(() => {
    const extrudeSettings = {
      depth: 1,
      bevelEnabled: false,
    };

    return new ExtrudeGeometry(shape, extrudeSettings);
  }, [shape]);

  const name = (type: string) => `/textures/WoodFloor007_1K-JPG_${type}.jpg`;

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    [
      name("Color"),
      name("Displacement"),
      name("NormalGL"),
      name("Roughness"),
      name("AmbientOcclusion"),
    ]
  );

  geometry.setAttribute(
    "uv2",
    new BufferAttribute(geometry.attributes.uv.array, 2)
  );

  colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(0.1, 0.1);

  return (
    <mesh
      geometry={geometry}
      position={[0 - 60, 0, 0 - 20]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        displacementScale={0}
      />
    </mesh>
  );
};

export default Floor;
