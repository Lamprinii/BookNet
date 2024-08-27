import Container from 'react-bootstrap/esm/Container.js';
import ListGroup from 'react-bootstrap/esm/ListGroup.js';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import BookService from "../../services/book.service.js";
import BookDataTable from './BookDataTable.jsx';
import React, { useState, useContext,useEffect } from 'react';

const AdminPanelBooks = () => {

    const [bookList, setBookList] = useState("");
    const [pending, setPending] = useState(true);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getAllBooks();
    }, [reload]); 

    const getAllBooks = () => {

        BookService.getAllBooks()
        .then(function (response) {
            setBookList(response);
        })
        .catch(function (error) {
            console.log("Error getting all books: ",error);
        })
        .finally(() => {
            setPending(false);
            setReload(false);
        });
        
    }

    const handleReload = () => {
        setReload(true);
    }

    return(
        <div className="datatable-container">
            <Container className="admin-edit-container"> 
                 
                <div >
                    <BookDataTable booksData={bookList} isPending={pending} handleReload={handleReload}/>
                </div>                  
                
            </Container>




        </div>

    )
    

}

export default AdminPanelBooks;