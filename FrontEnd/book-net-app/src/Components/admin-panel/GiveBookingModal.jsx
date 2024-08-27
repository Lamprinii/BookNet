import Modal from 'react-bootstrap/esm/Modal.js';
import Button from 'react-bootstrap/esm/Button.js';
import Form from 'react-bootstrap/esm/Form.js';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import BookingService from "../../services/booking.service.js";
import { toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";


const GiveBookingModal = ({ booking, showModal, closeModal,handleReload}) => {

    const applyChanges = () =>{
        BookingService.giveBooking(booking.id)
        .then((response) => {
            toast.success("The status of the booking is changed to recieved");
            console.log(response.data);
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
                    Book Delivery
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Client Name: {booking.firstName} {booking.lastName}</h4>
                <h4>Book Title: {booking.book.name} </h4>
                <div>
                    Are you sure you want to set the status as "Recieved" ?
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={applyChanges}>Yes</Button>
                <Button onClick={closeModal}>No</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GiveBookingModal;