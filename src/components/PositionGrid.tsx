import type { Position } from '../types';
import './PositionGrid.css';

export interface PositionGridProps {
  positions: Array<Position>;
}

export function PositionGrid(props: PositionGridProps): JSX.Element | null {
  const { positions } = props;
  return (
    <div className="position-grid">
      <div role="rowgroup" className="flex-header">
        <div role="columnheader" className="flex-cell ticker-column">Ticker</div>
        <div role="columnheader" className="flex-cell name-column">Name</div>
        <div role="columnheader" className="flex-cell exposure-column">Exposure</div>
      </div>

      <div role="rowgroup">
        {positions.map((stock) => (
          <div role="row" className="flex-row" key={stock.id}>
            <div role="cell" className="flex-cell ticker-column ticker-column-data">{stock.ticker}</div>
            <div role="cell" className="flex-cell name-column name-column-data">{stock.name}</div>
            <div
              role="cell"
              className={`flex-cell exposure-column exposure-column-data ${
                stock.exposure >= 0 ? 'positive' : 'negative'
              }`}
            >
              {stock.exposure?.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className='position-grid-border-top'></div>
    </div>
  );
}
