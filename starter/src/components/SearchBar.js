import propTypes from "prop-types";

const SearchBar = ({searchText, updateSearchText, isSearching}) => {

    const handleSearchTextChange = (event) => {
        updateSearchText(event.target.value);
    }

    return (
        <div className="search-books-input-wrapper">
            <input 
                type="text" 
                id="search-input" 
                name="query" 
                placeholder="Search by title, author, or ISBN" 
                value={searchText} 
                onChange={(event) => handleSearchTextChange(event)} 
            />
            {
                isSearching ? (<div id="loading-roller-wrap"></div>) : (<div></div>)
            }
        </div>
        
    );

};

SearchBar.propTypes = {
    searchText: propTypes.string.isRequired,
    updateSearchText: propTypes.func.isRequired
};

export default SearchBar;