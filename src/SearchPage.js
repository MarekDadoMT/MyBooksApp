import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {filter, isEmpty} from 'lodash'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


const SearchPage = (props) => {
  const [query, setQuery] = useState('')
  const [searchedBooks, setSearchedBooks] = useState([])

  useEffect(() => {
    const fetchData = () => {
      if (isEmpty(query)) {
        setSearchedBooks([])
      } else {
        BooksAPI.search(query).then((response) => {
          setSearchedBooks(filter(response, 'imageLinks.thumbnail'))
        })
      }
    }
    fetchData()
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
            searchedBooks.map((book) => {
              return (
                <Book key={book.id} book={book} onChangeBookState={props.onChangeBookState} />
              )
            })
          }
        </ol>
      </div>
    </div>
  )
}

SearchPage.propTypes = {
  onChangeBookState: PropTypes.func,
}

export default SearchPage
