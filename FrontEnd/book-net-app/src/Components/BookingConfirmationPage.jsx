// components/addbook.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import LoadingButton from './LoadingButton';
import GoogleLogin from './GoogleLogin';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import GoogleLoginButton from './GoogleLogin';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';




const BookingConfirmationPage = () => {
  const location=useLocation();
  const booking=location.state;
  const navigate=useNavigate();
  console.log(booking)
    
  return (
    <div className="w-500 booking-container">
        <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/BookingConfirmationPage.css"/>
        <h1>
            Your book has been reserved.
        </h1>
        The details of your booking have been sent in your email along with a pdf file.<i className='warning'>The pdf file is necessary to receive the book.</i> <br/>
        
        <div className='bookings-details'>
            Name: {booking.firstName} {booking.lastName}<br/><br/>
            Book: {booking.book.name}<br/><br/>
            Time: {booking.bookingTime}<br/><br/>
            <a className='warning'>
            Please, note that you need the pdf file in order to receive the book from the library.
            </a>
        <div className="backButton" onClick={()=>{
            navigate('/books')}}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Return to Library
                </div>
        </div>
    </div>
  );
};

export default BookingConfirmationPage;