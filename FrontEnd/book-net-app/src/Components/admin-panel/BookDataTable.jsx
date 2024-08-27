import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/esm/Dropdown.js';
import { AiOutlineEllipsis } from "react-icons/ai";
import BookService from "../../services/book.service.js";
import React, { useState, useContext,useEffect } from 'react';
import EditBookModal from './EditBookModal.jsx';
import AddBookModal from './AddBookModal.jsx';
import DeleteBookModal from './DeleteBookModal.jsx';
import Button from 'react-bootstrap/esm/Button.js';
import { FaEdit, FaTrash } from 'react-icons/fa';


const BookDataTable = ({ booksData, isPending ,handleReload}) => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditShow = (book) => {
        setSelectedBook(book);
        setShowEditModal(true);
    };

    const handleEditClose = () => setShowEditModal(false);

    const handleAddShow = () => setShowAddModal(true);
    const handleAddClose = () => setShowAddModal(false);

    const handleDeleteShow = (book) => {
        setSelectedBook(book);
        setShowDeleteModal(true);
    }
    const handleDeleteClose = () => setShowDeleteModal(false);


    const columns = [
        { 
            name: 'Id', 
            selector: row => row.id,
            sortable: true,
            width: '60px',
        },
        { 
            name: 'Title', 
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
            
            <Button variant="primary" className="button1-admin-panel-books" onClick={() => handleEditShow(row)}>
                <FaEdit />
            </Button>
            <Button variant="danger" onClick={() => handleDeleteShow(row)}>
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
        <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/AdminPanel.css"/>
        <DataTable 
                    title={
                        <div style={{ textAlign: 'center' }}>
                        Books 
                        <Button style={{ float: 'right' }} onClick={() => { handleAddShow() }}>Add Book</Button>
                        </div>
                    }
                    columns={columns} 
                    data={booksData} 
                    pagination
                    progressPending={isPending}
                    className="book-data-table"
        />
        {showEditModal && (<EditBookModal
                show={showEditModal}
                book={selectedBook}
                onHide={() => setShowEditModal(false)}
                showModal = {handleEditShow}
                closeModal = {handleEditClose}
                handleReload = {handleReload}
            
        />
        )}
        {showAddModal && (<AddBookModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                showModal = {handleAddShow}
                closeModal = {handleAddClose}
                handleReload = {handleReload}
        />
        )}
        {showDeleteModal && (<DeleteBookModal
                show={showDeleteModal}
                book={selectedBook}
                onHide={() => setShowDeleteModal(false)}
                showModal = {handleDeleteShow}
                closeModal = {handleDeleteClose}
                handleReload = {handleReload}
        />
        )}

    </>
  )
};

export default BookDataTable;