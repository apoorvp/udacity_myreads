import React from 'react';
import { BookShelfChanger } from './BookShelfChanger';
import PropTypes from 'prop-types';

const Book = (props) => {


    const { title, authors, imageLinks, shelf } = props.book;
    return (<li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks && imageLinks.thumbnail}})` }}></div>
                <BookShelfChanger onUpdateShelfType={props.onUpdateShelfType} shelf={shelf} />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors.map((author) => author)}</div>
        </div>
    </li>)
}
Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelfType: PropTypes.func.isRequired
}

export default Book;