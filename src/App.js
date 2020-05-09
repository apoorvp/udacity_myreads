import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './search-books/SearchBooks'
import * as BooksAPI from './util/BooksAPI';
import MyReads from './myreads/MyReads';
import { Route } from 'react-router-dom';
import Notification from './common/Notification';
class BooksApp extends React.Component {
  message = '';
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    loading: false
  }
  componentDidMount() {
    this.setState({ loading: true })
    this.message = "Loading...";
    BooksAPI.getAll().then((books) => {
      this.showLoading = false;
      this.setState({ loading: false, books: books });

    });
  }
  updateShelfType = (book, shelf) => {
    this.setState({ loading: true });
    this.message = "Updating.."
    BooksAPI.update(book, shelf).then(() => {

      book.shelf = shelf;
      const bookFound = this.state.books.some(b => b.id === book.id);
      this.setState((currState) => ({
        loading: false,
        books: bookFound ? (currState.books.map(b => book.id === b.id ?
          { ...b, shelf: shelf } : b)) : [...currState.books, book]
      }));

    })
  }


  render() {
    const { books } = this.state;
    return (

      <div className="app">
        <Notification show={this.state.loading} message={this.message} />
        <Route path='/search' render={() => (<SearchBooks booksListed={this.state.books} onUpdateShelfType={this.updateShelfType} books={this.state.books || []} />)} />
        <Route exact path='/' render={() => (
          <MyReads updateShelfType={this.updateShelfType} books={books} />
        )} />
      </div>

    )
  }
}

export default BooksApp
