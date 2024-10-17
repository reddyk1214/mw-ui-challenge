import type { Position } from '../types';
import './PositionGrid.css';

export interface PositionGridProps {
  positions: Array<Position>;
}

export function PositionGrid(props: PositionGridProps): JSX.Element | null {
  const { positions } = props;

  return (
    <div className="position-grid" role="grid" aria-label="Position data grid">
      <div role="rowgroup" className="flex-header">
        <div role="columnheader" className="flex-cell ticker-column" id="header-ticker">Ticker</div>
        <div role="columnheader" className="flex-cell name-column" id="header-name">Name</div>
        <div role="columnheader" className="flex-cell exposure-column" id="header-exposure">Exposure</div>
      </div>

      <div role="rowgroup">
        {positions.map((stock) => (
          <div role="row" className="flex-row" key={stock.id}>
            <div
              role="gridcell"
              className="flex-cell ticker-column-data"
              aria-labelledby="header-ticker"
            >
              {stock.ticker}
            </div>
            <div
              role="gridcell"
              className="flex-cell name-column-data"
              aria-labelledby="header-name"
            >
              {stock.name}
            </div>
            <div
              role="gridcell"
              className={`flex-cell exposure-column exposure-column-data ${
                stock.exposure >= 0 ? 'positive' : 'negative'
              }`}
              aria-labelledby="header-exposure"
            >
              {stock.exposure?.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="position-grid-border-top"></div>
    </div>
  );
}
