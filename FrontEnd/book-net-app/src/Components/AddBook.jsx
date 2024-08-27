// components/addbook.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import LoadingButton from './LoadingButton';
import GoogleLogin from './GoogleLogin';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import GoogleLoginButton from './GoogleLogin';
import BookService from '../services/book.service';
import {uploadBook} from '../services/imagekit.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBook = () => {
  const navigate=useNavigate();
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentcategory, setCurrentcategory] = useState("");
  const [currentnumofpages, setCurrentnumofpages] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentauthor, setCurrentauthor] = useState("");
  const [currentagerating, setCurrentagerating] = useState("");
  const [currentReleaseDate, setCurrentReleaseDate] = useState(new Date());
  const [photo,setPhoto]=useState("")

  const handleSubmit =(e) => {

  };

   const handleInputChange = (e) => {
    
  const { name, value } = e.target;
    if (name === 'name' ) {
      setCurrentTitle(value)
    } else if (name === 'category') {
      setCurrentcategory(value)
    } else if (name === 'numofpages') {
      setCurrentnumofpages(value)
    } else if (name === 'author') {
      setCurrentauthor(value)
    } else if (name === 'description') {
      setCurrentDescription(value)
    } else if (name === 'agerating') {
      setCurrentagerating(value)
    } else if (name === 'realeaseDate') {
      setCurrentReleaseDate(value)
    }
    else{
      setPhoto(e.target.files[0]);
    }
    
  }; 

  const handleButtonClick = () => {
    var counter=0;
    document.getElementById('title').classList.remove('error');
    document.getElementById('category').classList.remove('error');
    document.getElementById('date').classList.remove('error');
    document.getElementById('age').classList.remove('error');
    document.getElementById('author').classList.remove('error');
    document.getElementById('description').classList.remove('error');
    document.getElementById('numofpages').classList.remove('error');

    if (currentTitle === '') {
      document.getElementById('title').classList.add('error');
      counter++;
    } if (currentcategory === '') {
      document.getElementById('category').classList.add('error');
      counter++;
    } if (currentReleaseDate === '') {
      document.getElementById('date').classList.add('error');
      counter++;
    } if (currentagerating === '') {
      document.getElementById('age').classList.add('error');
      counter++;
    } if (currentDescription === '') {
      document.getElementById('description').classList.add('error');
      counter++;
    } if (currentnumofpages === '') {
      document.getElementById('numofpages').classList.add('error');
      counter++;
    }    if(photo ===''){
      counter++;
    }
    if(counter==0){
      BookService.addBook(currentTitle,currentcategory,currentnumofpages,currentReleaseDate,currentDescription,
      currentauthor,currentagerating)
      .then((response) => {
        uploadBook(response.id,photo);
        toast.success("The book has been successfully uploaded.")
        navigate('/books')
      })
      .catch(error => {
      console.log(error);
    }) 
  }
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
   
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
   
    return [year, month, day].join('-');
  }

  return (
      <Container fluid className="addbook-page w-500 align-items-center justify-content-center">
        <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/AddBook.css"/>
        <Row className="addbook-row text-center d-flex w-500 align-items-center justify-content-center">
          <Col sm={12} lg={12} md={12} className="addbook-card-col d-flex align-items-center justify-content-center">
            <Card className= "addbook-card my-sm-3 my-md-4 flex-wrap">
              <Card.Body className="p-sm-3 p-md-4">
              <Row>
                  <Col className="text-center mb-1">
                    <h1>Add Book</h1>
                  </Col>
                </Row>
                <Row>
                  <Form className="p-4 p-sm-0" id="addbook-form">
  
                    <Form.Group className="mb-3 w-100" controlId="formFullName" >
                      <Form.Label>Title</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          id='title'
                          type="text"
                          className="custom-fields" 
                          placeholder="Title" 
                          name="name"
                          value={currentTitle}
                          onChange={handleInputChange}                                                    
                        />
                          
                      </InputGroup>
  
                    </Form.Group>
  
  
                      <Form.Group className="mb-3 w-100" controlId="formcategory">
                      <Form.Label>Category</Form.Label>
                          <Form.Control
                              id='category'
                              type="text"
                              className="custom-fields" 
                              placeholder="Category" 
                              name="category"
                              value={currentcategory}
                              onChange={handleInputChange}                                                    
                          />
                      </Form.Group>
                              
                      <Form.Group className="mb-3 w-100" controlId="formnumofpages" >
                          <Form.Label>Number of Pages</Form.Label>
                          <InputGroup className="mb-3">
                              <Form.Control
                              id='numofpages'
                              type="number"
                              className="custom-fields" 
                              placeholder="Number of Pages"
                              name="numofpages"
                              value={currentnumofpages}
                              onChange={handleInputChange}
                              />
                          </InputGroup>
  
                      </Form.Group>
                    
                      <Form.Group className="mb-3 w-100" controlId="formauthor" >
                          <Form.Label>Author</Form.Label>
                          <InputGroup className="mb-3">
                              <Form.Control
                              id='author'
                              type="text"
                              className="custom-fields" 
                              placeholder="Author"
                              name="author"
                              value={currentauthor}
                              onChange={handleInputChange}
                              />
                          </InputGroup>
  
                      </Form.Group>
                    
                      <Form.Group className="mb-3 w-100" controlId="formDescription" >
                          <Form.Label>Description</Form.Label>
                          <InputGroup className="mb-3">
                              <Form.Control 
                              as="textarea"
                              id='description'
                              className="descform" 
                              placeholder="Description"
                              name="description"
                              value={currentDescription}
                              onChange={handleInputChange}
                              />
                          </InputGroup>
  
                      </Form.Group>
  
                      <Form.Group className="mb-3 w-100" controlId="formagerating" >
                          <Form.Label>Age Rating</Form.Label>
                          <InputGroup className="mb-3">
                              <Form.Control
                              id='age'
                              type="text"
                              className="custom-fields" 
                              placeholder="Age Rating"
                              name="agerating"
                              value={currentagerating}
                              onChange={handleInputChange}
                              />
                          </InputGroup>
  
                      </Form.Group>
                      <Form.Group className="mb-3 w-100" controlId="formReleaseDate" >
                          <Form.Label>Publication Date</Form.Label>
                          <InputGroup className="mb-3">
                              <Form.Control
                              id='date'
                              type="date"
                              className="custom-fields" 
                              placeholder="Publication Date"
                              name="realeaseDate"
                              value={currentReleaseDate}
                              onChange={handleInputChange}
                              />
                          </InputGroup>
  
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
  
                    
  
                      <LoadingButton
                          name="Submit"    
                          loadingText="Submitting..."
                          onClick={handleButtonClick}                                                  
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

export default AddBook;