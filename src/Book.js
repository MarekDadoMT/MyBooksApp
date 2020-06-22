import React, {useState, useEffect} from 'react'
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

  const [bookState, setBookState] = useState('')

  useEffect(() => {
    BooksAPI.get(props.book.id)
      .then((response) => setBookState(response.shelf))
    console.log(bookState)
  }, [])

  const handleChange = (e) => {
    props.onChangeBookState(props.book, e.value)
  }

  const decide = () => {
    if (props.book.shelf) {
      return (
        <Select
            defaultValue={props.book.shelf}
            options={options}
            isOptionDisabled={(option) => option.disabled}
            onChange={handleChange}
        />
      )
    } else {
      return (
        <Select
            defaultValue={{value: 'none'}}
            options={options}
            isOptionDisabled={(option) => option.disabled}
            onChange={handleChange}
        />
      )
    }
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
          {decide()}
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
