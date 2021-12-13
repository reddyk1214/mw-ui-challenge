import type { Position } from '../types';

import './PositionGrid.css';

export interface PositionGridProps {
  positions: Array<Position>;
}

export function PositionGrid(props: PositionGridProps): JSX.Element | null {
  const { positions } = props;
  return (
    <table className="PositionGrid">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Name</th>
          <th>Exposure</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => (
          <tr key={position.id}>
            <td>{position.ticker}</td>
            <td>{position.name}</td>
            <td>{position.exposure}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
