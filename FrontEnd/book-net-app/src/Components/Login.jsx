import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingButton from './LoadingButton.jsx';
import GoogleLogin from './GoogleLogin.jsx';
import Card from 'react-bootstrap/esm/Card.js';
import {FaEyeSlash, FaEye} from 'react-icons/fa';

import Form from 'react-bootstrap/esm/Form.js';
import InputGroup from 'react-bootstrap/esm/InputGroup.js';
import Button from 'react-bootstrap/esm/Button.js';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import GoogleLoginButton from './GoogleLogin.jsx';
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import { useNavigate } from 'react-router-dom';
import { uploadProfile } from '../services/imagekit.service.js';

import { useEffect } from 'react';
import { UserContext } from '../App.js';
import { toast } from 'react-toastify';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [googleLogin, setGoogleLogin] = useState(false);
    const [isGoogleSignUp,setIsGoogleSignUp] = useState(false);
    const [googleProfileImage,setGoogleProfileImage] = useState("");

    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    const {user, setUser} = useContext(UserContext);
    const {setUserIcon,setFirstName} = useContext(UserContext);

    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try { 
            if(googleLogin === false){
                const response = await AuthService.login(email, password); // Wait for login to complete
            }
            setGoogleLogin(false);
            handleLogin();
            setIsLoggedIn(true);
            toast.success("Successful Login");
        } catch (error) {
            setIsLoggedIn(false);
            if (!error.response) {
                toast.error("No response from the server. Please try again later.");
                return;
            }
            if (error.response.status === 401) {
                toast.error("Invalid Credentials");
            } else {
                toast.error("An error occurred. Please try again later.");
            }
            console.log(error);
        }

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await UserService.getUserByEmail(email);
            await setUser(response);
            await setFirstName(response.firstName);

            if(isGoogleSignUp === true){
                uploadProfile(response.id,googleProfileImage);
            }

            const imageUrl = "https://ik.imagekit.io/cineticketbooking/Users/" + response.id + ".jpeg";
            await setUserIcon(imageUrl);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleGoogleLoginComplete = (user_email,image_url,is_google_signup,) => {
       setEmail(user_email);
       setIsGoogleSignUp(is_google_signup);
       setGoogleProfileImage(image_url);
        
       setGoogleLogin(true)
       
    }

    useEffect(() => {
        if (googleLogin) {
            handleButtonClick();
        }
    },[googleLogin])


    return(
        <Container fluid className="login-page align-items-center justify-content-center">
                      <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/Login.css"/>

            <Row className="login-row text-center d-flex w-100 align-items-center justify-content-center">
                <Col sm={12} lg={7} md={6}  className="text-center d-flex align-items-center justify-content-center d-none d-lg-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid w-65" alt="Sample image" />  
                    
                </Col>
                <Col sm={12} lg={5} md={12} className="login-card-col d-flex align-items-center justify-content-center">
                   
                    
                    <Card fluid className= "login-card my-sm-3 my-md-5 flex-wrap">
                        <Card.Body className="p-sm-3 p-md-4">

                            <Row>
                                <Col className="text-center mb-4">
                                    <h1 className="login_title">Login to your account</h1>
                                    <p className="login_subtitle">Don't have an account? &nbsp;
                                        <Link to="/signup">Sign up</Link>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">

                                            <Form className="p-4 p-sm-3" id="login-form">
                                            
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                    <Form.Control 
                                                        type="email"
                                                        className="custom-fields-2" 
                                                        placeholder="Enter email" 
                                                        name="email"
                                                        value={email}                                              
                                                        onChange={handleInputChange}                                                    
                                                    />
                                                    <Form.Text className="text-muted info-text">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                                       
                                                <Form.Group className="mb-3" controlId="formBasicPassword" >
                                                    <Form.Label>Password</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Password"
                                                        className="custom-fields-2"
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

                                                <LoadingButton
                                                    name="Log in"    
                                                    loadingText="Logging in..."
                                                    onClick={handleButtonClick} 
                                                    className="custom-btn-2"                                      
                                                />
                                               
                                                
                    
                                            </Form>
                               
                            </Row>
                            <Row>
                                <Col xs={5}>
                                    <hr className="my-3" />
                                    </Col>
                                        <Col xs={2} className="text-center">
                                            <Form.Text className="or-display text-muted">OR</Form.Text>
                                        </Col>
                                    <Col xs={5} className="mb-4">
                                        <hr className="my-3" />
                                    </Col>
                            </Row>
                           
                            <GoogleLoginButton 
                                onLoginComplete={handleGoogleLoginComplete}
                                className="google-login-btn"
                            />     
                                                  
                        </Card.Body>
        
                    </Card>
                    

                </Col>
            </Row>      
        </Container>
    )

}

export default Login;