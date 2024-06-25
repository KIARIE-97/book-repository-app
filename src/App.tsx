import { useReducer,useEffect, useCallback } from 'react'
import Form from './components/Form'
import Tabledata from './components/Tabledata'
import useLocalStorage from './hooks/useLocalStorage'
import './App.scss'

interface IBook {
  id: number
  bookName: string
  authorName: string
  yearOfPublication: number
}

const initialBookState: IBook[] = [
  {
    id: 1,
    bookName: 'The Great Gatsby',
    authorName: 'F. Scott Fitzgerald',
    yearOfPublication: 1925,
  },
  {
    id: 2,
    bookName: 'One Hundred Years of Solitude',
    authorName: 'Gabriel Garcia Marquez',
    yearOfPublication: 1967,
  },
  {
    id: 3,
    bookName: 'A Passage to India',
    authorName: 'E.M. Forster',
    yearOfPublication: 1924,
  }
]



type Action = { type: 'Add_book'; book: IBook }
| { type: 'remove_book'; id: number }
| { type: 'edit_book'; id: number; book: IBook }
| { type: 'reset'; initialBooks: IBook[]}
| {type: 'search_book'; book: IBook}

const bookReducer = (state: IBook[], action: Action) => {
  switch (action.type) {
    case 'Add_book':
      return [...state, { ...action.book, id: state.length ? state[state.length - 1].id + 1 : 1 }];
      case 'remove_book': 
      return state.filter((book) => book.id !== action.id)
    case 'edit_book':
      return state.map((book) =>
        book.id === action.id ? { ...book, ...action.book } : book // if the book id matches the action id, update the book with the new book details
      )

    case 'reset':
      return action.initialBooks
    default:
      return state
  }
}

function App() {
  const [storedBooks, setStoredBooks] = useLocalStorage<IBook[]>('books', initialBookState)


 //usereducer operations of reading, updating and deleting books
  const [books, dispatch] = useReducer(bookReducer, storedBooks)
const removeBook = (id: number) => {
  dispatch({ type: 'remove_book', id })
}
const editBook = (id: number, book: IBook) => {
  dispatch({ type: 'edit_book', id, book })
}
const reset = () => {
  dispatch({ type: 'reset', initialBooks: initialBookState})
}
const addBook = (book: Omit<IBook, 'id'>) => {
  dispatch({ type: 'Add_book', book: { ...book, id: 0 } }) // id will be set by the reducer
}

useEffect(() => {
  setStoredBooks(books) // set the todos to local storage
}, [books, setStoredBooks]) 

  // const addBook = (book: IBook) => {
  //   dispatch({ type: 'Add_book', book: book })
  // }

  //use callback for previous and next
  

  return (
    <>
    
    <Form addBook={addBook} />
    <Tabledata books={books }
    removeBook={removeBook}
    editBook={editBook}
    resetbook={reset}
    />
      <h2></h2>
       
    </>
  )
}

export default App
