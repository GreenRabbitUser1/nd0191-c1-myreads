import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import debounce from "lodash.debounce";
import * as BooksAPI from '../BooksAPI';
import isEmpty from "../utils/isEmpty";
import Book from "./Book";
import {useNavigate, useLocation} from 'react-router-dom';
import propTypes from "prop-types";

const SearchPage = ({myBooks, updateMyBooks, shelfOptions}) => {

    let navigate = useNavigate();
    const location = useLocation();

    const [searchText, setSearchText] = useState('');    
    const [getBooks, setGetBooks] = useState(false);
    const [bookResults, setBookResults] = useState([]);
    const [maxResults, setMaxResults] = useState(20);
    const [isSearching, setIsSearching] = useState(false);

    const maxResultsOptions = [5, 10, 20];

    const updateSearchText = async (value) => {
        setIsSearching(true);
        // console.log('Search Text: ', value);
        setSearchText(value);
        debounceFetch();
    }

    const updateMaxResults = async (value) => {
        setIsSearching(true);
        let newMaxResults = maxResultsOptions[value];
        // console.log('Max Results: ', newMaxResults);
        setMaxResults(newMaxResults);
        debounceFetch();
    }

    const debounceFetch = useCallback(debounce(() => {
        setGetBooks(true);
    }, 1000), []);

    useEffect(() => {
        if (getBooks){
            setGetBooks(false);
            const getBookResults = async () => {
                let books = [];
                if (!isEmpty(searchText) && !isEmpty(maxResults)){
                    books = await BooksAPI.search(searchText, maxResults);
                    //  There is a known issue where the BooksAPI /search endpoint does not listen to any value passed for maxResults
                    //  This section below limits the results returned from BooksAPI /search to only the number of the books the user has set for maxResults in the UI
                    if (!isEmpty(books) && Array.isArray(books) && books.length > 0){
                        books = books.splice(0, maxResults);
                    }
                    else {
                        books = [];
                    }
                    // console.log('books', books);
                }
                if (location.search !== `?query=${encodeURIComponent(searchText)}&maxresults=${maxResults}`){
                    navigate(`?query=${encodeURIComponent(searchText)}&maxresults=${maxResults}`);
                }
                setBookResults(books);
                setIsSearching(false);
            };

            getBookResults();
        }
    }, [getBooks]);

    useEffect(() => {
        if (isSearching){
            return;
        }

        //  URL changed, perform search based on query parameters
        function queryStringToJson(queryString) {
            const params = new URLSearchParams(queryString);
            const queryObject = {};
        
            // Iterate through each key-value pair
            params.forEach((value, key) => {
                queryObject[key] = value;
            });
        
            return queryObject;
        }

        var query = queryStringToJson(location.search);

        // console.log(query);

        if (isEmpty(query?.maxresults)){
            query.maxresults = maxResults;
        }
        try {
            var x_max = parseInt(query.maxresults);
            if (x_max !== 5 && x_max !== 10 && x_max !== 20){
                query.maxresults = 20;
            }
            else { 
                query.maxresults = x_max;
            }
            query.maxresults = maxResultsOptions.indexOf(query.maxresults);
        }
        catch(e){
            // console.log('maxresults is not a valid value');
        }
        document.getElementById('max-results-select').selectedIndex = query.maxresults;
        if (!isEmpty(query?.query)){
            updateMaxResults(query.maxresults);
            updateSearchText(query.query);
        }
        else {
            setSearchText('');
            setBookResults([]);
        }

    }, [location])

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div id="max-results-wrap">
                    <div id="max-results-label">Max Results</div>
                    <select id="max-results-select" defaultValue={maxResults} onChange={(event) => updateMaxResults(event.target.selectedIndex)}>
                        {
                            maxResultsOptions.map((o, index) => {
                                return (
                                    <option key={index}>{o}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <SearchBar searchText={searchText} updateSearchText={updateSearchText} isSearching={isSearching} />
            </div>
            <div className="search-books-results">
                <div id="search-results-showing">
                    {`Showing ${bookResults.length} Results`}
                </div>
                <ol className="books-grid">
                    { 
                        bookResults.map((book, index) => {
                            
                            let isInMyBooks = false;

                            let matchingBook = myBooks.filter((myBook) => {
                                if (myBook.id === book.id){
                                    return myBook;
                                }
                            });
                            if (!isEmpty(matchingBook) && matchingBook.length > 0){
                                isInMyBooks = true;
                                matchingBook = matchingBook[0];
                            }

                            let bookshelfName = shelfOptions.filter((s) => {
                                if (s.tag === book.shelf){
                                    return s;
                                }
                            });
                            if (!isEmpty(bookshelfName) && bookshelfName.length > 0){
                                bookshelfName = bookshelfName[0].display;
                            }
                            else { 
                                bookshelfName = 'none';
                            }

                            return (
                                <Book 
                                    book={book} 
                                    updateMyBooks={updateMyBooks} 
                                    key={index} 
                                    shelfOptions={shelfOptions} 
                                    bookshelfTag={isInMyBooks ? matchingBook.shelf : (!isEmpty(book?.shelf) ? book.shelf : 'none')}
                                />
                            );
                        })
                    }
                </ol>
            </div>
        </div>
    );
};

SearchPage.propTypes = {
    myBooks: propTypes.array.isRequired, 
    updateMyBooks: propTypes.func.isRequired, 
    shelfOptions: propTypes.array.isRequired
};

export default SearchPage;