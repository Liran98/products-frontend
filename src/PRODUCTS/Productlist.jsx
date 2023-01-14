import React from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './Prodcutitem';
import Card from '../shared/card';
import { Button } from 'react-bootstrap';
import "../STYLING/products.css";
function Productlist(props) {

  if (props.items.length === 0) {
    return (
      <div className='product-list center'>
      <Card>
        <h3>NO PRODUCTS FOUND FOR THIS USER , ADD ONE MAYBE ?</h3>
        <Link to={"/products/new"}><Button variant='outline-light btn-primary'>Add Product</Button></Link>
        </Card>
      </div>)

  }

  return (
    <ul className="product-list"> 
    {props.items.map(product => {
      return (
        <ProductItem
          key={product.id}
          id={product.id}
          theProduct={product.product}
          price={product.price}
          deleteProduct={props.ondelete}
          // ProductIMG={product.image}
          description={product.description}
          owner={product.owner}
        />
      )
    })}
    </ul>

  )
}

export default Productlist