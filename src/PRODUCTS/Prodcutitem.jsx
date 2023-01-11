import React, { useContext } from 'react'
import Card from '../shared/card';
import { Authcontext } from '../shared/auth-context';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import LoadingSpinner from '../shared/loadingspinner';
import { useState } from 'react';
import ErrorModal from '../shared/ErrorModal';
import Modal from '../shared/Modal';
import "../STYLING/products.css";

function ProductItem(props) {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const auth = useContext(Authcontext);


  const history = useHistory();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);

  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);

  };

  async function DeleteHandler() {
    try {
      setloading(true);
      await fetch(`http://localhost:5000/api/products/${props.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      props.deleteProduct(props.id);
      console.log("deleting products");
      setloading(false);
      history.push('/users');
    } catch (err) {
      console.log(err);
      setError(err.message);
      setloading(false);
    }
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
        theheader="Delete your product"
        thefooter={
          <React.Fragment>
            <Button  style={{margin:'10px'}}  variant='outline-light btn-primary' inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button variant='outline-light btn-danger' danger onClick={DeleteHandler}>
              CONFIRM
            </Button>

          </React.Fragment>
        }
      >
        {loading && <LoadingSpinner asOverlay />}
        <h3>
          Are you sure you want to delete this product ?
        </h3>
      </Modal>

      <li className="product-item">
        <Card className="product-item__content">

          <div className="product-item__image">
            <img src={`http://localhost:5000/${props.ProductIMG}`} alt={props.name} />
          </div>
          <div className="product-item__info">
            <h2>Product: {props.theProduct}</h2>
            <h3>Description: {props.description}</h3>

            <h3>Price:  {props.price}$  </h3>
               
          
            <div className="product-item__actions">
              {auth.userId === props.owner && <Link to={`/products/${props.id}`}><Button variant="outline-light btn-primary">EDIT</Button></Link>}
              {auth.userId === props.owner && <Button variant="outline-light btn-danger" onClick={showDeleteWarningHandler} >DELETE</Button>}
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  )
}

export default ProductItem;