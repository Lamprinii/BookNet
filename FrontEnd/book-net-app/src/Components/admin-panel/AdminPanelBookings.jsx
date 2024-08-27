import Container from 'react-bootstrap/esm/Container.js';
import BookingService from "../../services/booking.service.js";
import BookingsDataTable from './BookingsDataTable.jsx';
import React, { useState, useContext,useEffect } from 'react';
import { UserContext } from '../../App.js';

const AdminPanelBookings = () => {

    const [bookingList, setBookingList] = useState("");
    const [pending, setPending] = useState(true);
    const [reload, setReload] = useState(false);
    const {user} = useContext(UserContext);

    useEffect(() => {
        getAllBookings();
    }, [reload]); 

    const getAllBookings = () => {

        BookingService.getAllBookings()
        .then(function (response) {
            console.log(response)
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
                <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/AdminPanel.css"/>
                <div className="datatable-container">
                    <BookingsDataTable bookingsData={bookingList} isPending={pending} handleReload={handleReload}/>
                </div>                  
                
            </Container>




        </div>

    )
    

}

export default AdminPanelBookings;