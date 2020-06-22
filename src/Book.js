import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'


const Book = (props) => {

  const options = [
    {value: 'currentlyReading', label: 'Currently Reading'},
    {value: 'wantToRead', label: 'Want to Read'},
    {value: 'read', label: 'Read'},
    {value: 'none', label: 'None'},
  ]

  const handleChange = (e) => {
    props.onChageBookState(props.book, e.value)
  }

  const customTheme = (theme) => {
    // Console.log(props.book.shelf.label)
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'orange',
        primary: 'green',
      },
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
          {/* <select onChange={handleChange} value={options.option}>*/}
          {/*  {*/}
          {/*    // Console.log(props.book.shelf)*/}
          {/*    Options.map(({option, value}) => (*/}
          {/*      <option key={value} value={value}>*/}
          {/*        {option}*/}
          {/*      </option>*/}
          {/*    ))*/}
          {/*  }*/}
          {/* </select>*/}

          <Select
              // Value={aha}
              options={options}
              theme={customTheme}
              onChange={handleChange}
          />
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors}</div>
      </div>
    </li>
  )

}

Book.propTypes = {
  // Index: PropTypes.number,
  book: PropTypes.object,
  onChageBookState: PropTypes.func,
}

export default Book
