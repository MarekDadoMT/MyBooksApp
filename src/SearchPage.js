import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {filter, isEmpty} from 'lodash'
import * as BooksAPI from './BooksAPI'


const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [searchedBooks, setSearchedBooks] = useState([])
  const [options] = useState([
    {option: 'Currently Reading', value: 'currentlyReading'},
    {option: 'Want to Read', value: 'wantToRead'},
    {option: 'Read', value: 'read'},
    {option: 'None', value: 'none'},
  ])

  useEffect(() => {
    if (isEmpty(query)) {
      setSearchedBooks([])
    } else {
      BooksAPI.search(query)
        .then((response) => {
          console.log(response)
          setSearchedBooks(filter(response, 'imageLinks.thumbnail'))
        })
    }
  }, [query])

  const updateQuery = (e) => {
    setQuery(e)
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
            className="close-search"
            to="/"
        >
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {
            searchedBooks.map((book, index) => (
              <li key={index}>
                <div className="book">
                  {/* <div className="book-top">*/}
                  <div
                      className="book-cover"
                      style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}
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
                      {/* <option value="move" disabled>Move to...</option>*/}
                      {/* <option value="currentlyReading">Currently Reading</option>*/}
                      {/* <option value="wantToRead">Want to Read</option>*/}
                      {/* <option value="read">Read</option>*/}
                      {/* <option value="none">None</option>*/}
                    </select>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
                {/* </div>*/}
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

SearchPage.propTypes = {
}

export default SearchPage
