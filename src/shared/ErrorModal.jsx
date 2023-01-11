import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from '../shared/Modal';


const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      theheader="An Error Occurred!"
      show={!!props.error}
      thefooter={<Button variant='outline-light btn-primary' onClick={props.onClear}>CLOSE</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;