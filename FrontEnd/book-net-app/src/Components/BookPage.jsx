import React, { useState } from 'react';
import { Book } from 'https://staticontnenthosting.blob.core.windows.net/booknetpublic/model/Book.js'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';




const BookPage = () => {
    const location=useLocation();
    const [checker,setChecker]=useState(true);
    const id=location.state;
    const navigate=useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [book, setbook] = useState();
    useEffect(() => {
        if (checker==true){
          axios.get("http://localhost:8080/api/books/book/"+id).then(response => {
          var booktemp=  new Book(response.data.name,response.data.id,response.data.category,response.data.numofpages,response.data.releaseDate,response.data.description,response.data.author,response.data.agerating, response.data.status); 
          setbook(booktemp);
          setLoading(false);
        });
        setChecker(false);
    }
      }, [checker]);
    
      if (isLoading) {
        return <div className="App">Loading...</div>;
      }
        return (
        <div className='book  d-flex flex-column gap-3'>
            <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/BookPage.css"/>
            <div className="bookheader">
                <div className="backButton" onClick={()=>{
            navigate('/books')}}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Return to Library
                </div>
                <h1>{book.name}</h1>
                </div>
            
            <div className='booktop d-flex flex-wrap flex-row gap-3'>
                <img src={book.photo}/>
                <div className="chars gap-1 d-flex flex-column  align-items-start justify-content-center">
                    <div className='director fields'><i className="field">Author</i> : {book.author}</div>
                    <div className='duration fields'><i className="field">Number of Pages</i> :{book.numofpages}</div>
                    <div className='genre fields'><i className="field">Category</i> : {book.category}</div>
                    <div className='realeasedate fields'><i className="field">Publication Date</i> : {book.releaseDate}</div>
                    <div className='rating fields'><i className="field">Age Rating</i> : {book.agerating}</div>

                </div>
            </div>
            <div className="discription fields">{book.description}</div>

            <div className='d-flex  align-items-start justify-content-center' >  
                <button onClick={()=>{
                console.log(book)
                if (book.status == "AVAILABLE") {
                    navigate('/booking', {state:book})
                }
                else {
                    toast.error("The book is already rented. Please come back in a few days.", {autoClose: 3000});
                }
             }} className="bookButton " role="button"><span className="text">Rent the Book </span></button>
            </div>

        </div>
    )

}

export default BookPage;