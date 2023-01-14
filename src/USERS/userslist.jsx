import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from '../shared/card';
import Usersitems from './usersitems';

function Userslist(props) {
    if(props.items.length === 0){
        return <div className='users-list center'>
        <Card>
        <h3>NO USERS FOUND , SINGUP MAYBE ?</h3>
        <Link to={'/auth'}><Button variant='outline-light btn-primary'>SIGNUP</Button></Link>
        </Card>
        </div>
    }

  return (
    <ul className="users-list">
{props.items.map(user =>{
    return(<Usersitems
         key={user.id}
         id={user.id}
         name={user.name}
         ProductCount={user.products.length}
        //  image={user.image}
         deleteUser={props.deleteUSER}
         
    />
    )
})}
</ul>
  )
 
}

export default Userslist;