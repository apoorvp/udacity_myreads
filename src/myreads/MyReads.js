import React from 'react';
import bookshelfs from '../data/BookShelf.json';
import { Link } from 'react-router-dom';
import BookShelf from '../common/BookShelf';
import PropTypes from 'prop-types';

const MyReads = (props) => {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div >
            <div className="list-books-content">
                <div>
                    {bookshelfs.map(bookshelf => {
                        const bookList = props.books.filter(book => book.shelf === bookshelf.shelfValue)
                        return <BookShelf key={bookshelf.id} onUpdateShelfType={props.updateShelfType} bookList={bookList} bookshelf={bookshelf} />
                    })}
                </div>
            </div>

            <div className="open-search">
                <Link to="/search">
                    <button >}>Add a book</button>
                </Link>
            </div>
        </div>
    )
}

 MyReads.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelfType: PropTypes.func.isRequired
}
export default MyReads;
