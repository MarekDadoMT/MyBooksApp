import React, {useState, useEffect} from 'react'
import {Link, Route} from 'react-router-dom'
import {filter} from 'lodash'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'


const BooksApp = () => {
  const [books, setBooks] = useState([])
  const [options] = useState([
    {option: 'Currently Reading', value: 'currentlyReading'},
    {option: 'Want to Read', value: 'wantToRead'},
    {option: 'Read', value: 'read'},
    {option: 'None', value: 'none'},
  ])

  useEffect(() => {
    BooksAPI.getAll()
      .then((response) => {
        console.log(response)
        setBooks(response)
      })
  }, [])


  return (
    <div className="app">
      <Route exact path="/search">
        <SearchPage books={books} />
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
                      filter(books, {shelf: 'currentlyReading'}).map((book, index) => (
                        <li key={index}>
                          <div className="book">
                            <div
                                className="book-cover"
                                style={{width: 128, height: 193,
                                  backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                            />
                            <div>
                              <select>
                                {
                                  options.map(({option, value}) => (
                                    <option key={value} value={value}>
                                      {option}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      ))
                    }
                  </ol>
                </div>

                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      filter(books, {shelf: 'wantToRead'}).map((book, index) => (
                        <li key={index}>
                          <div className="book">
                            <div
                                className="book-cover"
                                style={{width: 128, height: 193,
                                  backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                            />
                            <div>
                              <select>
                                {
                                  options.map(({option, value}) => (
                                    <option key={value} value={value}>
                                      {option}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      ))
                    }
                  </ol>
                </div>

                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      filter(books, {shelf: 'read'}).map((book, index) => (
                        <li key={index}>
                          <div className="book">
                            <div
                                className="book-cover"
                                style={{width: 128, height: 193,
                                  backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                            />
                            <div>
                              <select>
                                {
                                  options.map(({option, value}) => (
                                    <option key={value} value={value}>
                                      {option}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      ))
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
