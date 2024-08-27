import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/esm/Dropdown.js';
import { AiOutlineEllipsis } from "react-icons/ai";
import React, { useState, useContext,useEffect } from 'react';

import CancelBookingModal from './CancelBookingModal.jsx';
import Button from 'react-bootstrap/esm/Button.js';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';




const MyBookingsDataTable = ({ bookingsData, isPending ,handleReload}) => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleEditShow = (booking) => {
        setSelectedBooking(booking);
    };

    const handleCancelShow = (booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    }
    const handleCancelClose = () => setShowCancelModal(false);

    const getLocalTime = (booking,timeLabel) => {
        const localDateTime = new Date(booking.bookingTime);
        const formattedDateTime = format(localDateTime, "yyyy-MM-dd'T'HH:mm");
        return formattedDateTime.replace('T',' ');
    }


    const columns = [
        { 
            name: 'Id', 
            selector: row => row.booking_id,
            sortable: true,
            width: '60px',
        },
        { 
            name: 'Book Name', 
            selector: row => row.book_name,
            sortable: true,
            width: '200px'
        },
        
        {
            name: 'Booking Time', 
            selector: row => row.bookingTime,
            sortable: true,
            width: '150px'
        },
        {
            name: 'Status', 
            selector: row => row.booking_status,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
            
            <Button variant="danger" onClick={() => handleCancelShow(row)}>
                <FaTrash />
            </Button>
            </div>
            ),
            ignoreRowClick: true, // Ignore row clicks for this column
            allowOverflow: true,
            button: true,
            
        }
        // Add more columns as needed
    ];

  return (
    <>
            <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/BookDataTable.css"/>


        <DataTable 
                    title={
                        <div style={{ textAlign: 'center' }}>
                        My Bookings 
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

    </>
  )
};

export default MyBookingsDataTable;