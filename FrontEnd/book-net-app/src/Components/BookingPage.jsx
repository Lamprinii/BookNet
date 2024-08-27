// components/booking.js
import React, { useState ,useContext,Context} from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card.js';
import Form from 'react-bootstrap/esm/Form.js';
import InputGroup from 'react-bootstrap/esm/InputGroup.js';
import Button from 'react-bootstrap/esm/Button.js';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import LoadingButton from './LoadingButton.jsx';
import GoogleLogin from './GoogleLogin.jsx';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import GoogleLoginButton from './GoogleLogin.jsx';
import clsx from 'clsx'
import { useLocation } from 'react-router-dom';
import bookingService from '../services/booking.service.js';
import { useNavigate } from 'react-router-dom';
import QrScanner from "qr-scanner";
import QrFrame from "./Images/qr-frame.svg";
import { UserContext } from '../App.js';
import { toast } from 'react-toastify';



 
 
const BookingPage = () => {

 
  const location=useLocation();
  const book = location.state;
  const navigate=useNavigate();


  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [telephone, settelephone] = useState("");
  const {user, setUser} = useContext(UserContext);

 
  const handleSubmit =(e) => {
 
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);      
    } else if (name === 'firstName') {
      setfirstName(value);
    } else if (name === 'lastName') {
      setlastName(value);
    } else if (name === 'telephone') {
      settelephone(value);
    }
    
  };
 
  const handleButtonClick = () => {
      toast.info("Your request is being processed. Please Wait...😃", {autoClose: 15000});
      bookingService.addBookings(book.id,user.email, firstName, lastName,telephone).then(function (response) {
      navigate('/booking-confirmation', {state:response})
    })
  };

  return (

    <div>
      <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/BookingPage.css"/>
      <div className="outsidecontainter">
          <h1>
              Renter Details for {book.name}
          </h1>
      </div>
 
    <Container fluid className="booking-page align-items-center justify-content-center">
      <Row className="booking-row text-center d-flex w-100 align-items-center justify-content-center">
  
   
        <div className="formoutside">

   
        <Col sm={12} lg={6} md={12} className="booking-card-col d-flex align-items-center justify-content-center">
          <Card className= "booking-card my-sm-3 my-md-4 flex-wrap">
            <Card.Body className="p-sm-3 p-md-4">
              <Row>
 
                <Form className="p-4 p-sm-0" id="booking-form">
 
                  <Form.Group className="mb-3" controlId="formFullName" >
                    <Form.Label>Full Name</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        className="custom-fields"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}                                                    
                      />
                      <Form.Control
                        type="text"
                        className="custom-fields"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}                                                    
                      />
                        
                    </InputGroup>
 
                  </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Telephone</Form.Label>
                        <Form.Control
                            type="tel"
                            className="custom-fields"
                            placeholder="Enter your phone number"
                            name="telephone"
                            value={telephone}
                            onChange={handleInputChange}                                                    
                        />
                    </Form.Group>
 
                    <LoadingButton
                        name="Submit"
                        className="submit-btn-booking"  
                        loadingText="Submitting..."
                        onClick={handleButtonClick}                                                  
                    />
 
                </Form>
                
              </Row>
            </Card.Body>
          </Card>
        </Col>
        </div>
      </Row>
      
    </Container>

   </div>

  );
};
 
export default BookingPage;