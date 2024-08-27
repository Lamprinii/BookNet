import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/esm/Dropdown.js';
import { AiOutlineEllipsis } from "react-icons/ai";
import React, { useState, useContext,useEffect } from 'react';
import CancelBookingModal from './CancelBookingModal.jsx';
import GiveBookingModal from './GiveBookingModal.jsx';
import Button from 'react-bootstrap/esm/Button.js';
import { FaEdit, FaTrash} from 'react-icons/fa';
import RecieveBookingModal from './RecieveBookingModal.jsx';
import { format } from 'date-fns';

//import "../Style/BookDataTable.css";


const BookingsDataTable = ({ bookingsData, isPending ,handleReload}) => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showGiveModal, setShowGiveModal] = useState(false);
    const [showRecieveModal, setShowRecieveModal] = useState(false);


    const handleEditShow = (booking) => {
        setSelectedBooking(booking);
    };

    const handleCancelShow = (booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    }

    const handleGiveShow = (booking) => {
        setSelectedBooking(booking);
        setShowGiveModal(true);
    }

    const handleRecieveShow = (booking) => {
        setSelectedBooking(booking);
        setShowRecieveModal(true);
    }

    const handleCancelClose = () => setShowCancelModal(false);
    const handleGiveClose = () => setShowGiveModal(false);
    const handleRecieveClose = () => setShowRecieveModal(false);



    const getLocalTime = (booking,timeLabel) => {
        const localDateTime = new Date(booking.bookingTime);
        const formattedDateTime = format(localDateTime, "yyyy-MM-dd'T'HH:mm");
        return formattedDateTime.replace('T',' ');
    }

    const getButton=(booking)=>{
        if(booking.status=="BOOKED"){
            return(
            <Button onClick={() => handleGiveShow(booking)}>
                Give 
            </Button>
            )
        }else if(booking.status=="RECIEVED"){
            return(
                <Button onClick={() => handleRecieveShow(booking)}>
                    Recieve 
                </Button>
                )
        }
    }



    const columns = [
        { 
            name: 'Id', 
            selector: row => row.id,
            sortable: true,
            width: '60px',
        },
        { 
            name: 'Book Name', 
            selector: row => row.book.name,
            sortable: true,
            width: '200px'
        },
        {
            name: 'First Name', 
            selector: row => row.firstName,
            sortable: true,
            width: '150px'
        },
        {
            name: 'Last Name', 
            selector: row => row.lastName,
            sortable: true,
            width: '150px'
        }
        ,
        {
            name: 'Booking Time', 
            selector: row => row.bookingTime,
            sortable: true,
            width: '150px'
        },
        {
            name: 'Status', 
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
            {getButton(row)}
            <Button variant="danger" onClick={() => handleCancelShow(row)}>
                <FaTrash />
            </Button>
            </div>
            ),
            ignoreRowClick: true, // Ignore row clicks for this column
            allowOverflow: true,
            button: true,
            
        }
    ];

  return (
    <>              <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/BookDataTable.css"/>

                    <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/AdminPanel.css"/>
        <DataTable 
                    title={
                        <div style={{ textAlign: 'center' }}>
                        All Bookings 
                        </div>
                    }
                    columns={columns} 
                    data={bookingsData} 
                    pagination
                    progressPending={isPending}
                    className="my-bookings-data-table"
        />
        {showCancelModal && (<CancelBookingModal
                show={showCancelModal}
                booking={selectedBooking}
                onHide={() => setShowCancelModal(false)}
                showModal = {handleCancelShow}
                closeModal = {handleCancelClose}
                handleReload = {handleReload}
        />
        )}
        {showGiveModal && (<GiveBookingModal
                show={showGiveModal}
                booking={selectedBooking}
                onHide={() => setShowGiveModal(false)}
                showModal = {handleGiveShow}
                closeModal = {handleGiveClose}
                handleReload = {handleReload}
        />
        )}
        {showRecieveModal && (<RecieveBookingModal
                show={showRecieveModal}
                booking={selectedBooking}
                onHide={() => setShowRecieveModal(false)}
                showModal = {handleRecieveShow}
                closeModal = {handleRecieveClose}
                handleReload = {handleReload}
        />
        )}

    </>
  )
};

export default BookingsDataTable;