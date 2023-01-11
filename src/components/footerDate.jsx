import React from 'react'

function FooterDate() {

    const newDate = new Date().getFullYear();
  return (
    <footer className='footer'>CopyRight&copy;{newDate}</footer>
  )
}

export default FooterDate;