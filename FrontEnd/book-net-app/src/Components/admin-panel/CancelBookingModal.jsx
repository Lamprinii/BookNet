import Modal from 'react-bootstrap/esm/Modal.js';
import Button from 'react-bootstrap/esm/Button.js';
import Form from 'react-bootstrap/esm/Form.js';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import BookingService from "../../services/booking.service.js";
import { toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";


const CancelBookingModal = ({ booking, showModal, closeModal,handleReload}) => {

    const applyChanges = () =>{
        BookingService.deleteBooking(booking.booking_id)
        .then((response) => {
            toast.success("Successfully canceled the booking");
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
                    Cancel Booking
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Booking id: {booking.booking_id}</h4>
                <div>
                    Are you sure you want to cancel this booking?
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={applyChanges}>Yes</Button>
                <Button onClick={closeModal}>No</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CancelBookingModal;