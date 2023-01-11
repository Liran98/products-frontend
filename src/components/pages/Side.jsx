import React from 'react'
import { CSSTransition} from 'react-transition-group';

import "../../STYLING/sideDrawer.css";

function Side(props) {
  return (
   
        <CSSTransition
          in={props.show}
          timeout={200}  
          classNames="slide-in-left"
          mountOnEnter
          unmountOnExit
        >
 <aside className='side-drawer' onClick={props.clicked}>{props.children}</aside> 
        </CSSTransition>
        
  
  )
}

export default Side;