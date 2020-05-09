import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
const BookShelf = (props) => {

    const updateBookShelf = (book, shelf) => {
        props.onUpdateShelfType(book, shelf);
    }
    return (

        <div className="bookshelf">
            {(props.bookshelf.shelftype !== "none" && <h2 className="bookshelf-title">{props.bookshelf.shelfname}</h2>)}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.bookList && props.bookList.map(book => <Book onUpdateShelfType={(shelf) => updateBookShelf(book, shelf)} key={book.id} book={book} />)}
                </ol>

            </div>
        </div>
    )

}
BookShelf.propTypes = {
    bookList: PropTypes.array.isRequired,
    onUpdateShelfType: PropTypes.func.isRequired
}
export default BookShelf;