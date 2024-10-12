import './SearchInput.css';
import searchIcon from '../icons/search_16px.svg'; // Adjust path if necessary

export interface SearchInputProps {}

export function SearchInput(_props: SearchInputProps): JSX.Element | null {
  return (
    <div className="SearchInputContainer">
      <div className="SearchIconContainer">
        <img className="SearchIcon" src={searchIcon} alt="Search Icon" />
      </div>
      <input
        data-testid="search-input"
        className="SearchInput"
        type="search"
        placeholder="Search"
      />
    </div>
  );
}
