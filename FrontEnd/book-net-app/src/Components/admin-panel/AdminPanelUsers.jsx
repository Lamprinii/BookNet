import Container from 'react-bootstrap/esm/Container.js';
import ListGroup from 'react-bootstrap/esm/ListGroup.js';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import UserService from "../../services/user.service.js";
import UserDataTable from './UserDataTable.jsx';
import React, { useState, useContext,useEffect } from 'react';

const AdminPanelUsers = () => {
 
    const [userList, setUserList] = useState("");
    const [pending, setPending] = useState(true);
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
        getAllUsers();
    }, [reload]); 
    
    const getAllUsers = () => {
    
        UserService.getAllUsers()
        .then(function (response) {
            setUserList(response);
        })
        .catch(function (error) {
            console.log("Error getting all users: ",error);
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
        <div className="datatable-container">
            <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/AdminPanel.css"/>
            <Container className="admin-edit-container"> 
                     
                <div>
                    <UserDataTable usersData={userList} isPending={pending} handleReload={handleReload}/>
                </div>                  
                    
            </Container>
    
    
    
    
        </div>
    
    )
        
    
}
    

export default AdminPanelUsers;