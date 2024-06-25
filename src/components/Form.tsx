import {useState, useRef} from 'react'
import './form.scss'
// interface FormProps {
//   addBook: (book: { bookName: string; authorName: string; yearOfPublication: number }) => void;
// }

const Form = () => {
  const [books, setBooks] = useState<{ bookName: string; authorName: string; yearOfPublication: number }[]>([]);
const bookNameRef = useRef<HTMLInputElement>(null);
const authorNameRef = useRef<HTMLInputElement>(null);
const yearOfPublicationRef = useRef<HTMLInputElement>(null);

//ueseref to get the value of the input fields
const handleAddBook = () => {
  if (bookNameRef.current && authorNameRef.current && yearOfPublicationRef.current) {
    const bookName = bookNameRef.current.value;
    const authorName = authorNameRef.current.value;
    const yearOfPublication = parseInt(yearOfPublicationRef.current.value, 10);
    const newBook = {bookName, authorName, yearOfPublication};
    setBooks(books => [...books, newBook])
    bookNameRef.current.value = '';
    authorNameRef.current.value = '';
    yearOfPublicationRef.current.value = '';
  }
};
  return (
    <div>
        <div className="data">
        <h4>please register a book....</h4>
        <form>
        <input type="text" ref={bookNameRef}  placeholder="Enter book name..."/>
            <input type="text" ref={authorNameRef} placeholder="Enter author name..."/>
            <input type="text" ref={yearOfPublicationRef} placeholder="Enter year of publication..."/>
            <button className='btn' onClick={handleAddBook}>Submit</button>
           
            </form>
    </div>
    </div>
  )
}


export default Form
// interface Book {
//     bookName: string;
//     authorName: string;
//     yearOfPublication: number;
// }

// interface formProps {
//     addBook: (book: Book) => void;
// }

// const Form = () => {
 {/* <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} placeholder="Enter book name..."/>
            <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Enter author name..."/>
            <input type="text" value={yearOfPublication} onChange={(e) => setYearOfPublication(e.target.value)} placeholder="Enter year of publication..."/> */}
            {/* <button className='btn' >Submit</button> */}