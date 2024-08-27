// components/Books.js
import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard.jsx';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Header } from "react-router-dom";
import BookPage from './BookPage.jsx';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from'@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { UserContext } from '../App.js';
import { useState } from 'react';
import { useEffect } from 'react';
import bookService from '../services/book.service.js';



const Library = () => {
  const [isLoading, setisLoading] = useState(true);
  const navigate=useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  const [adminStatus, setAdminStatus] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [books,setBooks]=useState([]);

  const isAdmin = (user) => {
    const authority = user.authorities[0]?.authority;
    if(authority === "ADMIN" ){
      return true;
    }
    return false;
  }

  useEffect(() => {
    // This code will run whenever isLoggedIn changes its value
    if (isLoggedIn) {
      // Call isAdmin when user is logged in
      setAdminStatus(isAdmin(user));
    }
    if(isLoading){
      bookService.getAllBooks().then((response)=>{
        const list=response;
        for (let i = 0; i < list.length; i++){
          if((books.length<list.length)){
            books.push({id:list[i].id,name:list[i].name,status:list[i].status})
          }
        }
        setisLoading(false);
      })
    }
  }, [user,isLoading]);
  
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="book-outer-container">
      
          <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/Books.css"/>
          <div className="book-header">
          <h1>Library</h1>
          {isLoggedIn && adminStatus && (
          <div className='add-book-button' onClick={()=>{navigate("/addbook")}}>
            <a>
              <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
            </a>

          </div>)}
          </div>
         <div className='d-flex flex-row flex-wrap align-items-center justify-content-center gap-2' >
         {books.map((book) => (

            <div className="cards" onClick={()=>{
            navigate('/book',{state:book.id})
            }}>
              <BookCard   name={book.name} id={book.id} status={book.status}></BookCard>
            </div>
            ))}
        </div>

      
  </div>
    

  );
};

export default Library;