import { Group, Line } from "react-konva";
import { GRID_SIZE } from "../../constants/2dConstants";

interface GridProps {
  width: number;
  height: number;
}

const Grid: React.FC<GridProps> = ({ width, height }) => {
  return (
    <Group>
      {[...Array(width)].map((_, i) => (
        <Line
          key={i}
          points={[i * GRID_SIZE, 0, i * GRID_SIZE, height]}
          stroke="#ddd"
          strokeWidth={1}
        />
      ))}
      {[...Array(height)].map((_, i) => (
        <Line
          key={i}
          points={[0, i * GRID_SIZE, width, i * GRID_SIZE]}
          stroke="#ddd"
          strokeWidth={1}
        />
      ))}
    </Group>
  );
};

export default Grid;
