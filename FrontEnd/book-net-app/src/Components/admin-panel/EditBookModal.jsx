import Modal from 'react-bootstrap/esm/Modal.js';
import Button from 'react-bootstrap/esm/Button.js';
import Form from 'react-bootstrap/esm/Form.js';
import React, { useState,useEffect } from 'react';
import BookService from "../../services/book.service.js";
import { toast } from 'react-toastify';


const EditBookModal = ({ book, showModal, closeModal,handleReload}) => {

    const [currentTitle, setCurrentTitle] = useState(book.name);
    const [currentcategory, setCurrentcategory] = useState(book.category);
    const [currentnumofpages, setCurrentnumofpages] = useState(book.numofpages);
    const [currentDescription, setCurrentDescription] = useState(book.description);
    const [currentauthor, setCurrentauthor] = useState(book.author);
    const [currentagerating, setCurrentagerating] = useState(book.agerating);
    const [currentReleaseDate, setCurrentReleaseDate] = useState(book.releaseDate);

    const applyChanges = () =>{
        BookService.editbook(book.id,currentcategory,currentnumofpages,currentReleaseDate,currentDescription
            ,currentauthor,currentagerating)
            .then((response) => {
                toast.success("Successfully edited the book");
            })
            .catch(error => {
                toast.success("An error occurred. Please try later");
                console.log(error);
            })
            .finally( () => {
                closeModal();
                handleReload();
            })
    }


    return (
        <Modal 
            show={showModal} 
            onHide={closeModal}
            backdrop="static" 
            centered
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Book Info</h4>
                <div>
                    <Form>
                        
                        
                        <Form.Group className="w-100">

                            <Form.Label>Id</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={book.id} 
                                disabled
                            />

                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={currentTitle} 
                                disabled
                            />
                            
                            
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={currentcategory}
                                onChange={(e) => setCurrentcategory(e.target.value)}
                            />

                            <Form.Label>Number of Pages</Form.Label>
                            <Form.Control 
                                type="number"  
                                value={currentnumofpages}
                                onChange={(e) => setCurrentnumofpages(e.target.value)}
                            />

                            <Form.Label >Release Date</Form.Label>
                            <Form.Control 
                                type="date"  
                                value={currentReleaseDate}
                                onChange={(e) => setCurrentReleaseDate(e.target.value)}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea"
                                type="textarea"  
                                value={currentDescription}
                                onChange={(e) => setCurrentDescription(e.target.value)}
                            />

                            <Form.Label>Author</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={currentauthor}
                                onChange={(e) => setCurrentauthor(e.target.value)}
                            />


                            <Form.Label>Age Rating</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={currentagerating}
                                onChange={(e) => setCurrentagerating(e.target.value)}
                            />


                        </Form.Group>
                    
                    </Form>
                    
                </div> 
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={applyChanges}>Apply Changes</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditBookModal;