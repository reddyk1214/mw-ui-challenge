import './SearchInput.css';
import searchIcon from '../icons/search_16px.svg';

interface SearchInputProps {
  searchText: string;
  onSearch: (text: string) => void;
}

export function SearchInput({ searchText, onSearch }: SearchInputProps): JSX.Element | null {
  return (
    <div className="SearchInputContainer">
      <div className="SearchIconContainer">
        <img className="SearchIcon" src={searchIcon} alt="Search Icon" />
      </div>
      <input
        data-testid="search-input"
        className="SearchInput"
        type="search"
        value={searchText}
        onChange={(e) => onSearch(e.target.value)} 
        placeholder="Search"
        aria-label="Search positions"
      />
    </div>
  );
}
