import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as BooksAPI from '../BooksAPI';
import isEmpty from "../utils/isEmpty";
import Book from "./Book";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import BookDetail from "./BookDetail";

const BookPage = ({updateMyBooks, shelfOptions}) =>{

    // Load the book

    let location = useLocation();

    const [book, setBook] = useState(null);
    const [invalidId, setInvalidId] = useState(false);
    const [matchingShelf, setMatchingShelf] = useState({
        'tag': 'none',
        'display': 'None'
    });
    let bookId;
    let details = [
        {
            'label': 'Title',
            'tag': 'title',
            'fieldType': 'string'
        },
        {
            'label': 'Author(s)',
            'tag': 'authors',
            'fieldType': 'array'
        },
        {
            'label': 'Categories',
            'tag': 'categories',
            'fieldType': 'string'
        },
        {
            'label': 'Description',
            'tag': 'description',
            'fieldType': 'string'
        },
        {
            'label': 'Publisher',
            'tag': 'publisher',
            'fieldType': 'string'
        },
        {
            'label': 'Date Published',
            'tag': 'publishedDate',
            'fieldType': 'date'
        },
        {
            'label': 'Preview Link',
            'tag': 'previewLink',
            'fieldType': 'link'
        }
    ];
    

    useEffect(() => {
        const fetchBook = async () => {
            //  Get the bookId from the URL
            // console.log('location', location);
            let url = location.pathname;
            bookId = (url.substring(url.lastIndexOf('/') + 1));
            // console.log('bookId', bookId);

            if (isEmpty(bookId)){
                setInvalidId(true);
                return;
            }

            let res = null;
            try {
                res = await BooksAPI.get(bookId);
            }
            catch(e){
                console.log('Error fetching book', e);
            }

            if (isEmpty(res)){
                setInvalidId(true);
                return;
            }

            //  res has some value returned after searching for this bookId
            // console.log('res', res);
            var ms = shelfOptions.filter((b) => { 
                if (res?.shelf === b.tag) {
                    return b;
                }
            });
            if (!isEmpty(ms) && ms.length > 0){
                ms = ms[0];
                setMatchingShelf(ms);
            }
            setBook(res);
        };

        fetchBook();

    }, []);

    const updateMatchingShelf = (shelfIndex) => {
        var ms = shelfOptions[shelfIndex - 1];
        setMatchingShelf(ms);
    }

    return (
        <div id="book-page">
            <Link className="go-home" to="/" title="Go back to the previous page">
                Home
            </Link>
            <Link className="close-search" to={(-1)} title="Go back to the previous page">
                Close
            </Link>
            {
                !isEmpty(book) ?
                <div>
                    <div id="book-page-left-panel">
                        <Book 
                            book={book} 
                            updateMyBooks={(book, shelfIndex) => { updateMatchingShelf(shelfIndex); updateMyBooks(book, shelfIndex); }} 
                            shelfOptions={shelfOptions} 
                            bookshelfName={matchingShelf.display} 
                            bookshelfTag={matchingShelf.tag} 
                            hideBookLink={true}
                        />
                        <div className="book-detail-wrap">
                            <label className="book-detail-label">
                                Current Shelf
                            </label>
                            <div className="book-detail">
                                {matchingShelf.display}
                            </div>
                        </div>
                    </div>
                    <div id="book-page-right-panel">
                        <div id="book-details">
                            {
                                details.map((d, index) => {
                                    return (
                                        <BookDetail 
                                            key={index}
                                            label={d.label} 
                                            value={book[d.tag]} 
                                            fieldType={d.fieldType} 
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                :

                <div>
                    {
                        isEmpty(book) && 
                        (invalidId &&
                            <div>
                                Invalid Book ID
                            </div>
                        )
                        ||
                        <div>
                            Searching ...
                        </div>
                    }
                </div>
            }
        </div>
    )

};


BookPage.propTypes = {
    updateMyBooks: propTypes.func.isRequired,
    shelfOptions: propTypes.array.isRequired
};

export default BookPage;