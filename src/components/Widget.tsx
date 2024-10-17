import { useMemo, useState } from 'react';
import type { Position } from '../types';
import { PositionGrid } from './PositionGrid';
import { SearchInput } from './SearchInput';
import { createTransform } from '../utils/transform';
import './Widget.css';

export interface WidgetProps {
  positions: Array<Position>;
}

export function Widget({ positions }: WidgetProps): JSX.Element | null {
  const [searchText, setSearchText] = useState<string>('');

  const filteredPositions = useMemo(() => {
    const transform = createTransform(searchText);
    return transform(positions);
  }, [searchText, positions]);

  return (
    <div className="Widget">
      <SearchInput searchText={searchText} onSearch={setSearchText} /> 
      <PositionGrid positions={filteredPositions} />
    </div>
  );
}
