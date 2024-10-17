// @vitest-environment jsdom
import { render, fireEvent, cleanup } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput Component', () => {
  let onSearchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSearchMock = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('renders the search input with correct snapShot', () => {
    const { asFragment } = render(
      <SearchInput searchText="AAPL" onSearch={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('calls onSearch when typing in the input field', () => {
    const { getByTestId } = render(
      <SearchInput searchText="" onSearch={onSearchMock} />
    );
    
    const input = getByTestId('search-input');
    
    fireEvent.change(input, { target: { value: 'AAPL' } });

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('AAPL');
  });

  test('does not call onSearch when input is not changed', () => {
    const { getByTestId } = render(
      <SearchInput searchText="AAPL" onSearch={onSearchMock} />
    );
    
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'AAPL' } });
    
    expect(onSearchMock).not.toHaveBeenCalled();
  });
});
