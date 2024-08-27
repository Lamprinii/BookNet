import Container from 'react-bootstrap/esm/Container.js';
import BookingService from "../../services/booking.service.js";
import MyBookingsDataTable from './MyBookingsDataTable.jsx';
import React, { useState, useContext,useEffect } from 'react';
import { UserContext } from '../../App.js';

const MyBookings = () => {

    const [bookingList, setBookingList] = useState("");
    const [pending, setPending] = useState(true);
    const [reload, setReload] = useState(false);
    const {user} = useContext(UserContext);

    useEffect(() => {
        getAllBookings();
    }, [reload]); 

    const getAllBookings = () => {

        BookingService.getBookingByUserId(user.id)
        .then(function (response) {
            //console.log(response);
            setBookingList(response);
        })
        .catch(function (error) {
            console.log("Error getting all bookings: ",error);
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
        <div>
            <Container> 
                 
                <div className="datatable-container">
                    <MyBookingsDataTable bookingsData={bookingList} isPending={pending} handleReload={handleReload}/>
                </div>                  
                
            </Container>




        </div>

    )
    

}

export default MyBookings;