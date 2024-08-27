//GoogleLogin.js
import React,{useState,useEffect} from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import AuthService from "../services/auth.service";
import { FcGoogle } from "react-icons/fc";

import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';


const GoogleLoginButton = ({ onLoginComplete, className }) => {

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    scope: "openid profile email",
    onSuccess: async (codeResponse) => {
      try{
        console.log(codeResponse);
        const response = await axios.get(`http://localhost:8080/api/oauth2/code/google?code=${codeResponse.code}`);
        console.log(response);
        AuthService.oauth2login(response);
        //call the function that handles the login and pass the user email that authenticated
        onLoginComplete(response.data.user_email,response.data.image_url,response.data.isSignUp);
      }
      catch (error){
        console.log(error);
      }
        
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <Container className='custom-google-btn d-flex flex-column justify-content-md-center align-items-center'>
        <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/GoogleLogin.css"/>
        <Button onClick={googleLogin} className={`custom-Google-btn ${className}`}>
        <FcGoogle className="custom-google-icon"/>
          Continue with Google
        </Button>

        
        
    </Container>
    
  );
};

export default GoogleLoginButton;