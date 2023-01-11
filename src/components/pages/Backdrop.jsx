import React from 'react'
import "../../STYLING/backdrop.css";
function Backdrop(props) {
  return (
    <div className='backdrop' onClick={props.onClick}></div>
  )
}

export default Backdrop;