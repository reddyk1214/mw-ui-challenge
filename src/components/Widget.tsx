import type { Position } from '../types';
import { PositionGrid } from './PositionGrid';
import { SearchInput } from './SearchInput';

import './Widget.css';

export interface WidgetProps {
  positions: Array<Position>;
}

export function Widget(props: WidgetProps): JSX.Element | null {
  const { positions } = props;
  return (
    <div className="Widget">
      <SearchInput />
      <PositionGrid positions={positions} />
    </div>
  );
}
