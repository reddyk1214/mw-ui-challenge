// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { PositionGrid } from './PositionGrid';
import type { Position } from '../types';

test('renders PositionGrid with positive and negative stock exposure', () => {
  const positions: Position[] = [
    { id: '1', ticker: 'AAPL', name: 'Apple Inc', exposure: 1000 },
    { id: '2', ticker: 'TSLA', name: 'Tesla Inc', exposure: -500 },
  ];

  const { container } = render(<PositionGrid positions={positions} />);
  expect(container).toMatchSnapshot();
});
