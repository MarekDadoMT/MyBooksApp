import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import * as BooksAPI from './BooksAPI'


const Book = (props) => {

  const options = [
    {value: 'movingTo', label: 'Moving to...', disabled: true},
    {value: 'currentlyReading', label: 'Currently Reading', disabled: false},
    {value: 'wantToRead', label: 'Want to Read', disabled: false},
    {value: 'read', label: 'Read', disabled: false},
    {value: 'none', label: 'None', disabled: false},
  ]

  const isMountedRef = useRef(null)
  const [bookShelf, setBookShelf] = useState({value: ''})

  useEffect(() => {
    isMountedRef.current = true
    BooksAPI.get(props.book.id)
      .then((response) => {
        if (isMountedRef.current) {
          setBookShelf({value: response.shelf})
        }
      })
    return () => {
      isMountedRef.current = false
    }
  }, [props.book.id])

  const handleChange = (e) => {
    props.onChangeBookState(props.book, e.value)
  }

  return (
    <li>
      <div className="book">
        <div
            className="book-cover"
            style={{width: 128, height: 193,
              backgroundImage: `url(${props.book.imageLinks.thumbnail})`}}
        />
        <div>
          <Select
              value={bookShelf}
              options={options}
              isOptionDisabled={(option) => option.disabled}
              onChange={handleChange}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: 'green',
                },
              })}
          />
        </div>

        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  onChangeBookState: PropTypes.func,
}

export default Book
