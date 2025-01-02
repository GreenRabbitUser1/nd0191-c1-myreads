const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
};

// const books = [
//     {
//         'title': 'To Kill a Mockingbird',
//         'author': 'Harper Lee'
//     },
//     {
//         'title': 'Ender\'s Game',
//         'author': 'Orson Scott Card'
//     },
//     {
//         'title': '1776',
//         'author': 'David McCullough'
//     },
//     {
//         'title': 'Harry Potter and the Sorcerer\'s Stone',
//         'author': 'J.K. Rowling'
//     },
//     {
//         'title': 'The Hobbit',
//         'author': 'J.R.R. Tolkien'
//     },
//     {
//         'title': 'Oh, the Places You\'ll Go!',
//         'author': 'Dr. Seuss'
//     },
//     {
//         'title': 'The Adventures of Tom Sawyer',
//         'author': 'Mark Twain'
//     }
// ];

export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, {
        headers
    })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAll = () =>
    fetch(`${api}/books`, {
        headers
    })
    .then((res) => res.json())
    .then((data) => data.books);

export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shelf
        }),
    }).then((res) => res.json());

export const search = (query, maxResults) => {
    console.log('Query', query);
    console.log('Max Results', maxResults);

    return fetch(`${api}/search`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            maxResults
        }),
    })
    .then((res) => res.json())
    .then((data) => data.books);
};