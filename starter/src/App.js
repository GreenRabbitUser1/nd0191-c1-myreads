import "./App.css";
import { useState, useEffect, useCallback } from "react";
import SearchPage from "./components/SearchPage";
import BookshelfPage from "./components/BookshelfPage";
import BookPage from "./components/BookPage";
import {Route, Routes, useNavigate} from "react-router-dom";
import * as BooksAPI from './BooksAPI';
import debounce from "lodash.debounce";

function App() {

    const [myBooks, setMyBooks] = useState([]);

    const [submitUpdate, setSubmitUpdate] = useState(false);

    const [bookToUpdate, setBookToUpdate] = useState({});

    const shelfOptions = [
        {
            'display': 'Currenly Reading',
            'tag': 'currentlyReading'
        },
        {
            'display': 'Want to Read',
            'tag': 'wantToRead',
        },
        {
            'display': 'Read',
            'tag': 'read'
        },
        {
            'display': 'None',
            'tag': 'none'
        }
    ];

    const updateMyBooks = (book, shelfIndex) => {
        console.log('updateMyBooks -- books', book);
        console.log('updateMyBooks -- shelfIndex', shelfIndex);

        //  Add logic that will take input
        let newBooksList = [...myBooks];
        let shelfTag = shelfOptions[shelfIndex - 1].tag;
        let findBook = myBooks.map((myBook) => {
            return myBook.id;
        }).indexOf(book.id);
        if (findBook != -1){
            newBooksList[findBook].shelf = shelfTag;
            setBookToUpdate(newBooksList[findBook]);
        }
        else {
            book.shelf = shelfTag;
            newBooksList.push(book);
            setBookToUpdate(book);
        }
        setMyBooks(newBooksList);
        //  Update the book using BooksAPI so that the change persists with page refresh
        BooksAPI.update(book, shelfTag);
        console.log('newBooksList', myBooks);
        debounceUpdate();
    }

    useEffect(() => {
        if (submitUpdate){
            const updateBook = async () => {
                let book = await BooksAPI.update(bookToUpdate.id, bookToUpdate.shelf);
                console.log('updateBook book', book);
            };

            updateBook();
        }
    }, [submitUpdate])

    const debounceUpdate = useCallback(debounce(() => {
        setSubmitUpdate(true);
    }, 1), []);

    useEffect(() => {
        const getAllBooks = async () => {
            const books = await BooksAPI.getAll();
            console.log('getAll:', books);
            setMyBooks(books);
        };

        getAllBooks();
    }, []);



    return (
        <Routes>
            <Route exact path="/" element={
                <BookshelfPage myBooks={myBooks} updateMyBooks={updateMyBooks} shelfOptions={shelfOptions} />
            } />
            <Route path="/search" element={
                <SearchPage myBooks={myBooks} updateMyBooks={updateMyBooks} shelfOptions={shelfOptions} />
            } />
            <Route path="/book/:slug" element={
                <BookPage updateMyBooks={updateMyBooks} shelfOptions={shelfOptions} />
            } />
        </Routes>
    );
}

export default App;
