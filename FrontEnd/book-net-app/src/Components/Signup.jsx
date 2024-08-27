// components/Signup.js
import React, { useState,useContext  } from 'react';
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
import authService from '../services/auth.service.js';
import { uploadProfile } from '../services/imagekit.service.js';
import { UserContext } from '../App.js';
import { useNavigate } from 'react-router-dom';
import { counter } from '@fortawesome/fontawesome-svg-core';

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [photo,setPhoto]=useState("")
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'firstName') {
      setfirstName(value);
    } else if (name === 'lastName') {
      setlastName(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    }else{
      setPhoto(e.target.files[0])
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


  const handleButtonClick = () => {
    counter=0;
    document.getElementById('email').classList.remove('error');
    document.getElementById('pass').classList.remove('error');
    document.getElementById('first').classList.remove('error');
    document.getElementById('last').classList.remove('error');
    document.getElementById('passconf').classList.remove('.error');

    if (email === ''|| !(email.includes('@'))) {
      document.getElementById('email').classList.add('error');
      counter++;
    }if (password === '') {
      document.getElementById('pass').classList.add('error');
      counter++;
    }if (firstName === '') {
      document.getElementById('first').classList.add('error');
      counter++;
    }if (lastName === '') {
      document.getElementById('last').classList.add('error');
      counter++;
    }if (passwordConfirm === '') {
      document.getElementById('pasconf').classList.add('error');
      counter++;
    }if (password != passwordConfirm ){
      document.getElementById('pass').classList.add('error');
      document.getElementById('passconf').classList.add('error');
      counter++;
    }
    if (counter==0){
      authService.register(firstName,lastName,email).then((response)=>{
        uploadProfile(response.id,photo);
      }).catch((err)=>{
        console.log(err);
      })
    }
  };


  return (
    <Container fluid className="signup-page align-items-center justify-content-center">
                <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/Signup.css"/>

      <Row className="signup-row text-center d-flex w-100 align-items-center justify-content-center">
        <Col sm={12} lg={12} md={12} className="signup-card-col d-flex align-items-center justify-content-center">
          <Card className= "signup-card my-sm-3 my-md-4 flex-wrap">
            <Card.Body className="p-sm-3 p-md-4">
              <Row>
                <Col className="text-center mb-1">
                  <h1 className='signup_title'>Sign up</h1>
                  <p className='signup_subtitle'>Already have an account? &nbsp;
                  <Link to="/login">Login</Link>
                  </p>
                </Col>
              </Row>
              <Row>

                <Form className="p-4 p-sm-0" id="signup-form">

                  <Form.Group className="mb-3" controlId="formFullName" >
                    <Form.Label>Full Name</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control 
                        id='first'
                        type="text"
                        className="custom-fields" 
                        placeholder="First Name" 
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}                                                    
                      />
                      <Form.Control 
                      id='last'
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
                    <Form.Label>Email</Form.Label>
                        <Form.Control
                            id='email'
                            type="email"
                            className="custom-fields" 
                            placeholder="Enter email" 
                            name="email"
                            value={email}
                            onChange={handleInputChange}                                                    
                        />
                    </Form.Group>
                            
                    <Form.Group className="mb-3" controlId="formPassword" >
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            id='pass'
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="custom-fields"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="custom-eye-Btn"                                          
                            >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPasswordConfirm" >
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            id='passconf'
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="Re-enter Password"
                            className="custom-fields"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={handleInputChange}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                className="custom-eye-Btn"                                          
                            >
                            {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>

                    </Form.Group>

                    <Form.Group controlId="formImage" className="mb-4">
                      <Form.Label>Profile Picture</Form.Label>
                      <Form.Control 
                        type="file" 
                        accept=".png, .jpeg, .jpg"
                        customName="custom-fields"
                        />
                    </Form.Group>

                    <LoadingButton
                        name="Submit"    
                        loadingText="Submitting..."
                        onClick={handleButtonClick}
                        className="custom-btn-2"                                                  
                    />

                </Form>
                
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
