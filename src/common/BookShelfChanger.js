import React, { Component } from 'react';
import bookshelfs from '../data/BookShelf.json'
import PropTypes from 'prop-types';
export class BookShelfChanger extends Component {
    static propTypes = {
        shelf: PropTypes.string,
        onUpdateShelfType: PropTypes.func.isRequired
    }
    state = {
        value: ''
    }
    componentDidMount() {
        this.setState({ value: this.props.shelf || 'none' })
    }
    onShelfTypeChange = (event) => {
        this.setState({ value: event.target.value })
        this.props.onUpdateShelfType(event.target.value)
    }
    render() {
        return (<div className="book-shelf-changer">
            <select value={this.state.value} onChange={this.onShelfTypeChange}>
                <option value="move" disabled>Move to...</option>
                {bookshelfs.map(bookshelf => <option key={bookshelf.id} value={bookshelf.shelfValue}>{bookshelf.shelfname}</option>)}
                <option value="none">None</option>
            </select>
        </div>);
    }
}
