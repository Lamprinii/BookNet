import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import bookImage from './Images/Logo.png';
import "../App.css";
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from'@fortawesome/free-regular-svg-icons'
import {faFilm} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/esm/Container';
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react";

function BookCard({ name, id, status }) {


        useGSAP(() => {
            gsap.to(".bookCard",{scale:1,duration:1,delay:0.5,ease:"none"})
        })

        let imagepath="https://ik.imagekit.io/cineticketbooking/Books/"+id+".jpeg";
        return (
            <div className="bookCard p-2">
                          <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/BookCard.css"/>

                <img className='bookPhoto' src={imagepath}></img>
                <div className="bookText">
                    <a>{name}</a>
                    <div className='status'>
                    <a>
                         { status}
                    </a> 
            </div>
                </div>
                
            </div>
        )
}

export default BookCard ; 