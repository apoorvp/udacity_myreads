import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../common/Book';
import * as BooksAPI from '../util/BooksAPI';
import PropTypes from 'prop-types';
class SearchBooks extends Component {
    static propTypes = {
        onUpdateShelfType: PropTypes.func.isRequired,
        booksListed: PropTypes.array.isRequired
    }
    state = {
        books: null
    }
    updateBookShelf = (book, shelf) => {
        this.props.onUpdateShelfType(book, shelf);
    }
    searchBook = (event) => {
        event.preventDefault();
        const { value } = event.target;
        BooksAPI.search(value || ''.trim()).then((books) => {
            let allBooks = books && !books.error ? books : [];
            allBooks = allBooks.map(book => {
                const bookFound = this.props.booksListed.find(b => b.id === book.id);
                return bookFound ? { ...book, shelf: bookFound.shelf } : book;
            })
            this.setState({ books: allBooks });
        }).catch(err => {
            this.state({
                books: []
            })
            console.log(err);
        })
    }

    render() {
        const { books } = this.state;
        return (<div className="search-books" >
            <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input type="text" value={this.state.value} onChange={this.searchBook} placeholder="Search by title or author" />

                </div>
            </div>
            <div className="search-books-results">
                {(books && books.length === 0) && <h2>No results found</h2>}
                <ol className="books-grid">
                    {books && books.map(book => <Book onUpdateShelfType={(shelf) => this.updateBookShelf(book, shelf)} key={book.id} book={book} />)}
                </ol>
            </div>
        </div >
        )
    }
}

export default SearchBooks;