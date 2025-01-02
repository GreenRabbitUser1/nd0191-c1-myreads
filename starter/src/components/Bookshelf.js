import propTypes from "prop-types";
import Book from './Book';

const Bookshelf = ({bookshelfName, bookshelfTag, myBooks, updateMyBooks, shelfOptions}) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        myBooks.map((book, index) => {
                            return (
                               <Book 
                                    book={book} 
                                    updateMyBooks={updateMyBooks} 
                                    key={index} 
                                    shelfOptions={shelfOptions} 
                                    bookshelfName={bookshelfName} 
                                    bookshelfTag={bookshelfTag}
                                />
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    );

};

Bookshelf.propTypes = {
    bookshelfName: propTypes.string.isRequired,
    myBooks: propTypes.array.isRequired,
    updateMyBooks: propTypes.func.isRequired
}

export default Bookshelf;