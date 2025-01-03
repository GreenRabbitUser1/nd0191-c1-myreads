import propTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import isEmpty from "../utils/isEmpty";

const Book = ({book, updateMyBooks, shelfOptions, bookshelfTag, hideBookLink}) => {

    const [bookshelf, setBookshelf] = useState(bookshelfTag);

    const handleUpdateMyBooks = (event) => {
        // console.log('handleUpdateMyBooks event.target.selectedIndex', event);
        updateMyBooks(book, event.target.selectedIndex)
    }

    useEffect(() => {
        const updateBookshelf = () => {
            setBookshelf(bookshelfTag)
        };
        updateBookshelf();
    }, [bookshelfTag])

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book?.imageLinks?.thumbnail || book?.imageLinks?.smallThumbnail}")`
                    }}></div>
                    ({
                        !hideBookLink &&
                        <Link to={`/book/${book.id}`}>
                            <div className="book-link-img"></div>
                        </Link>
                    })
                    <div className="book-shelf-changer">
                        <select onChange={(event) => handleUpdateMyBooks(event)} defaultValue={bookshelf}>
                            <option value="move-to" disabled>Move to...</option>
                            {
                                shelfOptions.map((o, index) => {
                                    return (
                                        <option 
                                            value={o.tag} 
                                            key={index} 
                                            aria-selected={o.tag === bookshelfTag ? 'selected' : ''}
                                        >
                                            {o.display}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="book-main-details">
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{!isEmpty(book.authors) ? book.authors.join(', ') : ''}</div>
                    <div className="book-pages">{`${!isEmpty(book.pageCount) ? book.pageCount : '?'} pages`}</div>
                </div>
            </div>
        </li>
    )
};

Book.propTypes = {
    book: propTypes.object.isRequired,
    updateMyBooks: propTypes.func.isRequired,
    shelfOptions: propTypes.array.isRequired,
    bookshelfTag: propTypes.string.isRequired,
    hideBookLink: propTypes.bool
};

export default Book;