import React, { useCallback, useReducer } from 'react'
import Input from '../../shared/Input';
import { Button } from 'react-bootstrap';
import ImageUpload from '../../shared/imageUpload';
import { useHistory } from 'react-router';
import { Authcontext } from '../../shared/auth-context';
import { useContext } from 'react';
import LoadingSpinner from '../../shared/loadingspinner';
import { useState } from 'react';
import "../../STYLING/products.css";
import ErrorModal from '../../shared/ErrorModal';
const formReducer = (state, action) => {

  switch (action.type) {

    case 'INPUT_CHANGE':
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        } // go through all the inputs in state.inputs

      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value }
        },

      };

    default:
      return state;
  }

};


function AddProducts() {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      product: {
        value: "",

      },
      price: {
        value: "",

      },
      image: {
        value: null
      },
      description: {
        value: ""
      }
    },

  })

  const inputHandler = useCallback((id, Value) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: Value,
      inputId: id
    });

  }, []);

  const auth = useContext(Authcontext);
  const history = useHistory();
  async function productsubmit(event) {
    event.preventDefault();
    console.log(formState.inputs);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', formState.inputs.image.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('price', formState.inputs.price.value);
      formData.append('product', formState.inputs.product.value);
      formData.append('owner', auth.userId);

     const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData
      });
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      history.push('/users');
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "failed to fetch addproduct page");
      throw err;
    }


  }

  const clearError = () => {
    setError(null);
  }


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="add-product__form" onSubmit={productsubmit}>
        {isloading && <LoadingSpinner AsProductLay />}
        <Input
          id="product"
          element="input"
          label="Product"
          onInput={inputHandler}
          type="text"

        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
        />

        <Input
          id="price"
          element="input"
          label="Price"
          type="number"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          onInput={inputHandler}

        />
        <Button variant='outline-light btn-primary' type="submit" >
          ADD PRODUCT
        </Button>
      </form>
    </React.Fragment>
  )
}

export default AddProducts;