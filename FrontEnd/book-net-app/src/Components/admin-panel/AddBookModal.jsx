import Modal from 'react-bootstrap/esm/Modal.js';
import Button from 'react-bootstrap/esm/Button.js';
import Form from 'react-bootstrap/esm/Form.js';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import BookService from "../../services/book.service.js";
import {uploadBook} from "../../services/imagekit.service.js";
import { useNavigate } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";


const AddBookModal = ({ showModal, closeModal,handleReload}) => {


    const navigate=useNavigate();
    const [currentTitle, setCurrentTitle] = useState();
    const [currentcategory, setCurrentcategory] = useState();
    const [currentnumofpages, setCurrentnumofpages] = useState();
    const [currentDescription, setCurrentDescription] = useState();
    const [currentauthor, setCurrentauthor] = useState();
    const [currentagerating, setCurrentagerating] = useState();
    const [currentReleaseDate, setCurrentReleaseDate] = useState();
    const [currentLanguage, setCurrentLanguage] = useState();
    const [photo,setPhoto]=useState("")



    const handleSubmit = () =>{
        var counter=0;
        document.getElementById('title').classList.remove('error');
        document.getElementById('category').classList.remove('error');
        document.getElementById('numofpages').classList.remove('error');
        document.getElementById('description').classList.remove('error');
        document.getElementById('agerating').classList.remove('error');
        document.getElementById('releasedate').classList.remove('error');
        document.getElementById('author').classList.remove('error');

        if (currentTitle === '') {
            document.getElementById('title').classList.add('error');
            counter++;
          } if (currentcategory === '') {
            document.getElementById('category').classList.add('error');
            counter++;
          } if (currentReleaseDate === '') {
            document.getElementById('releasedate').classList.add('error');
            counter++;
          } if (currentagerating === '') {
            document.getElementById('agerating').classList.add('error');
            counter++;
          } if (currentDescription === '') {
            document.getElementById('description').classList.add('error');
            counter++;
          } if (currentnumofpages === '') {
            document.getElementById('numofpages').classList.add('error');
            counter++;
          } 
          if(photo ===''){
            counter++;
          }
          if(counter==0){
            BookService.addBook(currentTitle,currentcategory,currentnumofpages,currentReleaseDate,currentDescription,
                currentauthor,currentagerating,currentLanguage)
                .then((response) => {
                  uploadBook(response.id,photo);
                  navigate('/add-show-time',{state:response});
                })
                .catch(error => {
                console.log(error);
              })
              .finally( () => {
                closeModal();
                handleReload();
            })
        }
        
    }

    const handleInputChange = (e) => {
        setPhoto(e.target.files[0]);

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
                    Add Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Book Info</h4>
                <div>
                    <Form onSubmit={handleSubmit}>
                        
                        
                        <Form.Group className="w-100">

                        
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                id = "title"
                                type="text"
                                onChange={(e) => setCurrentTitle(e.target.value)} 
                            />
                            
                            
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                id = "category"
                                type="text"  
                                onChange={(e) => setCurrentcategory(e.target.value)}
                            />

                            <Form.Label>Number of Pages</Form.Label>
                            <Form.Control
                                id = "numofpages"
                                type="number"  
                                onChange={(e) => setCurrentnumofpages(e.target.value)}
                            />

                            <Form.Label >Release Date</Form.Label>
                            <Form.Control
                                id = "releasedate"
                                type="date"  
                                onChange={(e) => setCurrentReleaseDate(e.target.value)}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                id = "description"
                                as="textarea"
                                type="textarea"
                                onChange={(e) => setCurrentDescription(e.target.value)}
                            />

                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                id = "author"
                                type="text"  
                                onChange={(e) => setCurrentauthor(e.target.value)}
                            />


                            <Form.Label>Age Rating</Form.Label>
                            <Form.Control
                                id = "agerating"
                                type="text"                                 
                                onChange={(e) => setCurrentagerating(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group controlId="formImage" className="mb-4">
                      <Form.Label>Front Page Picture</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        className="custom-fields"
                        onChange={handleInputChange}
                        />
                    </Form.Group>

                    </Form>
                    
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>



    );
};

export default AddBookModal;