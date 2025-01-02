import Bookshelf from "./Bookshelf";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";

const BookshelfPage = ({myBooks, updateMyBooks, shelfOptions}) => {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>My Reads</h1>
                <h2>Udacity React Nanodegree Final Project</h2>
                <h3>Jordan Manningham</h3>
            </div>
            <div className="list-books-content">
                <div>
                    {
                        shelfOptions.slice(0, shelfOptions.length - 1).map((s, index) => {
                            return (
                                <Bookshelf 
                                    key={index} 
                                    bookshelfName={s.display} 
                                    bookshelfTag={s.tag} 
                                    myBooks={myBooks.filter((b) => {
                                        if (b.shelf === s.tag){
                                            return b;
                                        }
                                    })} 
                                    updateMyBooks={updateMyBooks}    
                                    shelfOptions={shelfOptions}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    Add a book
                </Link>
            </div>
        </div>
    );
};

BookshelfPage.propTypes = {
    myBooks: propTypes.array.isRequired,
    updateMyBooks: propTypes.func.isRequired
};

export default BookshelfPage;