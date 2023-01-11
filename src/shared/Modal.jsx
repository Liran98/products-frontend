import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../components/pages/Backdrop';
import '../STYLING/Modal.css';

const ModalOverlay = props => {
  return (
    <div className={'modal__header'}>
      <header className={'modal__content'} >
        <h2>{props.theheader}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={'modal__footer'}>
          {props.children}
        </div>
        <footer className={'modal__footer'} >
          {props.thefooter}
        </footer>
      </form>
    </div>
  );

};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        classNames="modal"
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}

      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
