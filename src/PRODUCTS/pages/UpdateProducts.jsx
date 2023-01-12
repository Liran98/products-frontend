import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router'
import { Card } from 'react-bootstrap';
import '../../STYLING/products.css'
import Input from '../../shared/Input';
import { Button } from 'react-bootstrap';
import { Authcontext } from '../../shared/auth-context';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import LoadingSpinner from '../../shared/loadingspinner';

function updateReducer(state, action) {

  switch (action.type) {
    case 'INPUT_CHANGE':
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value }
        }
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,

      };
    default:
      return state;
  }
}


function UpdateProducts() {
  const [isloading, setIsLoading] = useState(false);
  const auth = useContext(Authcontext);
  const [loadedProducts, setloadedProducts] = useState();
  const productId = useParams().productId;

  const [updateState, dispatch] = useReducer(updateReducer, {
    inputs: {
      product: {
        value: ""

      },
      price: {
        value: "",

      },
      description: {
        value: ""

      }
    }
  });

  const inputhandler = useCallback((id, value) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      inputId: id
    });
  }, []);



  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const responsedata = await response.json();
        setloadedProducts(responsedata.products);

        dispatch({
          product: {
            value: responsedata.products.product,
          },
          description: {
            value: responsedata.products.description,
          },
          price: {
            value: responsedata.products.price,
          },

        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [productId, dispatch]);




  const history = useHistory();
  async function Productsubmit(event) {

    console.log(updateState.inputs);
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`, {
        method: 'PATCH',

        body: JSON.stringify({
          product: updateState.inputs.product.value,
          price: updateState.inputs.price.value,
          description: updateState.inputs.description.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responsedata = await response.json();
      setloadedProducts(responsedata.products);

      history.push('/' + auth.userId + '/products');
    } catch (err) {
      console.log(err);
    
      setIsLoading(false);
    }

  }
  if (isloading) {
    return (
      <div className="center">
        {isloading && <LoadingSpinner asOverlay />}
      </div>
    );
  }
  if (!loadedProducts) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find product!</h2>
        </Card>
      </div>
    );
  }

  return (loadedProducts &&
    <form className="product__form" onSubmit={Productsubmit}>
      {isloading && <LoadingSpinner asOverlay />}
      <Input
        id="product"
        element="input"
        type="text"
        label="Product name:"
        onInput={inputhandler}
        theupdate={loadedProducts.product}
      />
      <Input
        element="input"
        id="price"
        label="Price:"
        onInput={inputhandler}
        type="number"
        theupdate={loadedProducts.price}
      />
      <Input
        element="textarea"
        id="description"
        label="Description:"
        onInput={inputhandler}
        type="text"
        theupdate={loadedProducts.description}
    
      />
      <Button variant='outline-light btn-primary' type="submit">
        UPDATE PRODUCT
      </Button>
    </form>

  )
}

export default UpdateProducts;