// @vitest-environment jsdom
import { render, fireEvent, cleanup } from '@testing-library/react';
import { expect, test, vi, describe, beforeEach, afterEach } from 'vitest';
import { Widget } from './Widget';
import { PositionGrid } from './PositionGrid';
import { createTransform } from '../utils/transform';
import type { Position } from '../types';

vi.mock('./SearchInput', () => ({
  SearchInput: vi.fn(({ searchText, onSearch }) => (
    <input
      data-testid="mock-search-input"
      type="search"
      value={searchText}
      onChange={(e) => onSearch(e.target.value)}
    />
  ))
}));

vi.mock('./PositionGrid', () => ({
  PositionGrid: vi.fn(() => <div data-testid="mock-position-grid" />)
}));

vi.mock('../utils/transform', () => ({
  createTransform: vi.fn(() => vi.fn((positions: Position[]) => positions))
}));

describe('Widget Component', () => {
  let positions: Position[];

  beforeEach(() => {
    positions = [
      { id: '1', ticker: 'AAPL', name: 'Apple Inc', exposure: 100 },
      { id: '2', ticker: 'AMZN', name: 'Amazon.com Inc', exposure: 200 }
    ];
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('renders SearchInput and PositionGrid components', () => {
    const { container } = render(<Widget positions={positions} />);
    expect(container).toMatchSnapshot();
  });

  test('calls createTransform with the searchText and positions', () => {
    const mockTransform = vi.fn(() => positions);
    (createTransform as jest.Mock).mockReturnValue(mockTransform);

    const { getByTestId } = render(<Widget positions={positions} />);

    expect(createTransform).toHaveBeenCalledWith('');
    expect(mockTransform).toHaveBeenCalledWith(positions);

    const inputElement = getByTestId('mock-search-input');
    fireEvent.change(inputElement, { target: { value: 'AAPL' } });

    expect(createTransform).toHaveBeenCalledWith('AAPL');
  });

  test('passes filtered positions to PositionGrid', () => {
    const filteredPositions = [
      { id: '1', ticker: 'AAPL', name: 'Apple Inc', exposure: 100 }
    ];

    const mockTransform = vi.fn(() => filteredPositions);
    (createTransform as jest.Mock).mockReturnValue(mockTransform);

    render(<Widget positions={positions} />);

    expect(PositionGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        positions: filteredPositions
      }),
      {}
    );
  });

  test('updates PositionGrid when searchText changes', () => {
    const mockTransform = vi.fn((positions: Position[]) => positions);
    (createTransform as jest.Mock).mockReturnValue(mockTransform);

    const { getByTestId } = render(<Widget positions={positions} />);

    const inputElement = getByTestId('mock-search-input');
    fireEvent.change(inputElement, { target: { value: 'AMZN' } });

    expect(createTransform).toHaveBeenCalledWith('AMZN');
    expect(PositionGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        positions: positions
      }),
      {}
    );
  });
});
