import React , { useState} from 'react'
import Side from '../components/pages/Side';
import MainHeader from './mainheader';
import { Link } from 'react-router-dom';
import Backdrop from '../components/pages/Backdrop';

import "../STYLING/navlinks.css";
import NavLinks from './NavLinks';

function MAINNavLinks() {



  const [open,setopen] = useState(false);

  function handleDrawer(){
    setopen((e)=>{
        return !e;
    })
  }
  return (
   

   
   <React.Fragment>
{open && <Backdrop onClick={handleDrawer}/>}
<Side show={open} clicked={handleDrawer} >
<nav className="main-navigation__drawer-nav">
<NavLinks/>
</nav>
</Side>

<MainHeader>
      <button onClick={handleDrawer} className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>

        <h1 className="main-navigation__title">
        <Link to="/">HOMEPAGE</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
</MainHeader>
</React.Fragment>
  )
}

export default  MAINNavLinks;