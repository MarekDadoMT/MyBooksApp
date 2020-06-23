import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    isMountedRef.current = true
    BooksAPI.get(props.book.id)
      .then((response) => {
        if (isMountedRef.current) {
          setBookShelf({value: response.shelf})
        }
        setLoading(false)
      })
    return () => {
      isMountedRef.current = false
    }
  }, [loading])

  const handleChange = async (e) => {
    setLoading(true)
    await props.onChangeBookState(props.book, e.value)
  }

  return (
    <li>
      <div className="book">
        <div
            className="book-cover"
            style={{width: 128, height: 193,
              backgroundImage: `url(${props.book.imageLinks.thumbnail})`}}
        />
        <div className="hoho">
          {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin fa-2x fa-fw" />}
          {
            !loading &&
            <Select
                value={bookShelf}
                options={options}
                isOptionDisabled={(option) => option.disabled}
                onChange={handleChange}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: 'green',
                  },
                })}
            />
          }
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
