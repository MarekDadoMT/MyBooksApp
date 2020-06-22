import React, {useState, useEffect} from 'react'
import {Link, Route} from 'react-router-dom'
import {filter} from 'lodash'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import Book from './Book'


const BooksApp = () => {
  const [books, setBooks] = useState([])
  const [bookState, setBookState] = useState('')

  useEffect(() => {
    BooksAPI.getAll()
      .then((response) => {
        setBooks(response)
      })
  }, [bookState])

  const onChangeBookState = async (book, e) => {
    await BooksAPI.update(book, e)
    setBookState(e)
  }


  return (
    <div className="app">
      <Route exact path="/search">
        <SearchPage books={books} onChangeBookState={onChangeBookState} />
      </Route>

      <Route exact path="/">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      filter(books, {shelf: 'currentlyReading'}).map((book) => {
                        return (
                          <Book key={book.id} id={book.id} book={book} onChangeBookState={onChangeBookState} />
                        )
                      })
                    }
                  </ol>
                </div>


                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      filter(books, {shelf: 'wantToRead'}).map((book) => {
                        return (
                          <Book key={book.id} id={book.id} book={book} onChangeBookState={onChangeBookState} />
                        )
                      })
                    }
                  </ol>
                </div>

                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      filter(books, {shelf: 'read'}).map((book) => {
                        return (
                          <Book key={book.id} id={book.id} book={book} onChangeBookState={onChangeBookState} />
                        )
                      })
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="open-search">
            <Link to="/search">
              <button type="button">Add a book</button>
            </Link>
          </div>
        </div>

      </Route>

    </div>
  )
}

export default BooksApp
