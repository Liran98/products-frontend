import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Card from "../shared/card";
import '../STYLING/USERS.css';
import Avatar from '../shared/Avatar';
import { Button } from 'react-bootstrap';
import { Authcontext } from '../shared/auth-context';
import { useContext } from 'react';
import ErrorModal from '../shared/ErrorModal';
import Modal from '../shared/Modal';


import LoadingSpinner from '../shared/loadingspinner';

function Usersitems(props) {
  const [isLoading, setIsLoading] = useState(false);  
  const [error, setError] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false); 

  


  const auth = useContext(Authcontext);





  async function deleteHandler() {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/users/${props.id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },

        });
      if (!response.ok) {
        throw new Error(response.message);
      }
   
      props.deleteUser(props.id);
      setIsLoading(false);
   
      auth.Logout();
      return response;

    } catch (err) {
    
      setIsLoading(false);
    }
    console.log("deleting user");
  }

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  
  const clearError = () => {
    setError(null);
  }

  return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
   
   <Modal
     show={showConfirmModal}
     onCancel={cancelDeleteHandler}
     theheader="Are you sure?"
     contentClass="product-item__modal-content"
     thefooter={
       <React.Fragment>
         <Button style={{margin:'10px'}} variant='outline-light btn-primary' inverse onClick={cancelDeleteHandler}>
           CANCEL
         </Button>
         <Button variant='outline-light btn-danger' danger onClick={deleteHandler}>
        CONFIRM
         </Button>
         
       </React.Fragment>
     }
   >
    {isLoading && <LoadingSpinner asOverlay />}
     <h3>
  Do you want to delete your account ? you cant undo this once clicked , choose wisely 
     </h3>
   </Modal>
      <li className="user-item">
        <Card className="user-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <Link to={`${props.id}/products`}>
            <div className="user-item__image">
              <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
            </div>

            <div className="user-item__info">
              <h2>{props.name.toUpperCase()}</h2>
              <h3>{props.ProductCount} {props.ProductCount === 1 ? "Product" : "Products"}</h3>
            </div>
          </Link>
          {auth.userId === props.id &&
            <Button 
            variant='outline-light btn-danger' 
            onClick={showDeleteWarningHandler}>
            REMOVE USER
            </Button>
          }
        </Card>
      </li>
      <div className="user-item__info">
    
      </div>
    </React.Fragment>
  )
}

export default Usersitems;