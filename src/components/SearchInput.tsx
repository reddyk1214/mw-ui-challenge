import './SearchInput.css';

export interface SearchInputProps {}

export function SearchInput(_props: SearchInputProps): JSX.Element | null {
  return (
    <input
      data-testid="search-input"
      className="SearchInput"
      type="search"
      placeholder="Search for a position"
    />
  );
}
