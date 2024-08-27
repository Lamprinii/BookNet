import Nav from 'react-bootstrap/esm/Nav.js';
import Navbar from 'react-bootstrap/esm/Navbar.js';
import Offcanvas from'react-bootstrap/esm/Offcanvas.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from'@fortawesome/free-regular-svg-icons'
import {faPhone,faMapLocationDot} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/esm/Container.js';
import ReactRouterBootstrap,{ LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';


function Footer({icon,user}) {
    
    return (
        <div className="Footer">
                      <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/Footer.css"/>

            <div className="container">
                <Row>
                    <Col className='footerLogo'>
                        <Navbar.Brand className='brandFooter' href="#home"><img width="150"  className="Navbarlogo" src="https://ik.imagekit.io/cineticketbooking/Logo/Logo.png?updatedAt=1722274528289"></img></Navbar.Brand>
                        <p className="footer_paragraph">Unlimited Stories <br/> One Library</p>
                    </Col>
                    <Col className='footerMenuContainer' id="roadmap">
                        <h2 className="footer_titles">Site Roadmap</h2>
                        <ul className='footerMenu d-flex flex-column align-items-center justify-content-flex-end gap-2'>
                            <li><i className="footerLink"><Link to="/">Home Page</Link></i></li>
                            <li><i className="footerLink"><Link to="/books">Library</Link></i></li>
                            <li><i className="footerLink"><Link to="/contactus">Contact Us</Link></i></li>
                        </ul>
                    </Col>
                    <Col className='footerMenuContainer'>
                        <h2 className="footer_titles">Contact Us</h2>
                        <ul className='footerMenu contactFooter d-flex flex-column align-items-center justify-content-center gap-2'>
                            <li>
                                <a><FontAwesomeIcon className='fafooter' icon={faPaperPlane}/><i className="footerLink">booknet@gmail.com</i></a>
                            </li>
                            <li><a><FontAwesomeIcon className='fafooter' icon={faPhone} /> <i className="footerLink">6998989898</i></a></li>
                            <li><a><FontAwesomeIcon className='fafooter' icon={faMapLocationDot}/> <i className="footerLink">University of Pireaus, Karaoli & Dimitriou 80</i></a></li>
                            
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    );
  }
  
  export default Footer;