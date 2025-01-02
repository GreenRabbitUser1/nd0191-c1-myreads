import propTypes from "prop-types";
import { useState } from "react";

const Book = ({book, updateMyBooks, shelfOptions, bookshelfTag}) => {

    const [bookshelf, setBookshelf] = useState(bookshelfTag);

    const handleUpdateMyBooks = (event) => {
        console.log('handleUpdateMyBooks event.target.selectedIndex', event);
        updateMyBooks(book, event.target.selectedIndex)
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => handleUpdateMyBooks(event)} defaultValue={bookshelf}>
                            <option value="none" disabled>Move to...</option>
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
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
            </div>
        </li>
    )
};

Book.propTypes = {
    book: propTypes.object.isRequired,
    updateMyBooks: propTypes.func.isRequired
};

export default Book;