import Modal from 'react-bootstrap/esm/Modal.js';
import Button from 'react-bootstrap/esm/Button.js';
import Form from 'react-bootstrap/esm/Form.js';
import React, { useState,useEffect } from 'react';
import UserService from "../../services/user.service.js";
import { toast } from 'react-toastify';


const EditUserModal = ({ user, showModal, closeModal,handleReload, roles}) => {

    const [currentRole, setCurrentRole] = useState(user.authorities[0]?.authority.replace("ROLE_",""));
    const [localCurrentRole, setLocalCurrentRole] = useState(currentRole);

    const applyChanges = () =>{
        UserService.editUserRole(user.id,currentRole)
            .then((response) => {
            })
            .catch(error => {
                
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
                    Change User Role
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>User Info</h4>
                <div>
                    <Form>
                        
                        <Form.Group className="w-100">

                            <Form.Label>Id</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={user.id} 
                                disabled
                            />

                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={user.firstName} 
                                disabled
                            />
                            
                            
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={user.lastName}
                                disabled
                            />

                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={user.email}
                                disabled
                            />

                        
                            <Form.Label>Role</Form.Label>
                            <Form.Select onChange={(e) => setCurrentRole(e.target.value)}>
                            <option hidden >Current Role: {localCurrentRole}</option>
                                {roles.filter(role => role !== localCurrentRole).map((role, index) => (
                                    <option 
                                        key={index} 
                                        value={role}
                                    >{role}</option>
                                ))}
                            </Form.Select>
                    
                        </Form.Group>
                    
                    </Form>
                    
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={applyChanges}>Apply Changes</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;