import Nav from 'react-bootstrap/esm/Nav.js';
import Navbar from 'react-bootstrap/esm/Navbar.js';
import Offcanvas from'react-bootstrap/esm/Offcanvas.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
//import logo from 'https://staticontnenthosting.blob.core.windows.net/booknetpublic/Logo.png';
//import "../App.css";
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from'@fortawesome/free-regular-svg-icons'
import {faFilm} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/esm/Container.js';
import ReactRouterBootstrap,{ LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Popup from 'reactjs-popup';

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';
import AuthService from "../services/auth.service.js";
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/esm/NavDropdown.js';

function Menubar({icon,username}) {

  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  const [unknownUserIcon,setUnknownUserIcon]=useState("https://ik.imagekit.io/cineticketbooking/Users/unknownuser.png");
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const {isAdmin,setIsAdmin} = useContext(UserContext);
  const {isInspector, setIsInspector} = useContext(UserContext);

  const isUserAdmin = (user) => {
    const authority = user.authorities[0]?.authority;
    if(authority === "ADMIN" ){
      return true;
    }
    return false;
  }

  const isUserInspector = (user) => {
    const authority = user.authorities[0]?.authority;
    if(authority === "INSPECTOR" ){
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (isLoggedIn) {
      setIsAdmin(isUserAdmin(user));
      setIsInspector(isUserInspector(user));
    }
  }, [user]);


  const handleLogout = () => {
    AuthService.logout()
        .then(function (response) {
            setIsLoggedIn(false);
            navigate('/');
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  const handleMyBookingsClick = () => {
    navigate('/my-bookings');
  }
    
    return (
        <Navbar expand="lg" fixed="top" variant="light" className="rounded-pill m-2 p-0 navbar" >
          <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/MenuBar.css"/>
          <Container fluid>
            <Navbar.Brand className='me-auto' as={Link} to="/"><img width="150"  className="Navbarlogo" src="https://ik.imagekit.io/cineticketbooking/Logo/Logo.png?updatedAt=1722274528289"></img></Navbar.Brand>
            <Navbar.Toggle  data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"><FontAwesomeIcon className="burger" icon={faFilm}/></Navbar.Toggle>
            <Navbar.Offcanvas id="offcanvasNavbar" 
              placement='end'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title className='ctitle'>
                  CineTicketBooking
                </Offcanvas.Title>
              </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="ms-auto gap-3 offcanvas-body " id='offcanvasNavbar'>
                      <Nav.Link as={Link} to="/">Home</Nav.Link>
                      <Nav.Link as={Link} to="/books" >Library</Nav.Link>
                      
                      {isLoggedIn && isAdmin && (
                        <>             
                          <NavDropdown title="Admin Panel" className='admin-panel-nav'>
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to="/admin-panel/books">Edit Books</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to="/admin-panel/users">Edit Users</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to="/admin-panel/bookings">Edit Bookings</Nav.Link>
                            </NavDropdown.Item>
                          </NavDropdown>              
                        </>
                      )}

                     <Nav.Link as={Link} to="/contactus">Contact Us</Nav.Link>
                    </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {isLoggedIn ? (
              <Popup trigger={<Nav.Link className='exlink rounded-pill'><a className='extext'>{username}</a><img className="fic pull-right navbar-text rounded-pill" src={icon}/></Nav.Link>}position='bottom center'>
              <div className="popupcontainer">
                <div className='usericoncontainer'>
                <img className="fic pull-right navbar-text rounded-pill usericon" src={icon}/>
                </div>
                
                <ul className='userlist'>             
                              <li 
                                className = 'useritem'
                                onClick = {handleMyBookingsClick}                         
                              >
                                My Books History
                              </li>
                              <li 
                                className='useritem logout'
                                onClick = {handleLogout}
                              >
                                Log Out
                              </li>
                </ul>
              </div>
            </Popup>      


          ) : (
                <Nav.Link className='exlink rounded-pill' as={Link} to="/login">
                  <i className='extext'>Login</i>
                  <img className="fic pull-right navbar-text rounded-pill" src={unknownUserIcon}/></Nav.Link>              
          )}
              
        </Container>
    </Navbar>
    );
  }
  
  export default Menubar;
