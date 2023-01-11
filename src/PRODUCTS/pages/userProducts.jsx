import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import ProductList from '../Productlist';
import LoadingSpinner from '../../shared/loadingspinner';
import ErrorModal from '../../shared/ErrorModal';



function Products() {
  const [loading, setisloading] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState();
  const [error, setError] = useState();
  const userId = useParams().userId;

  useEffect(() => {

    async function fetchUserProducts() {
      try {
        setisloading(true);
        const response = await fetch(`http://localhost:5000/api/products/user/${userId}`)

        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message);

        }
        setLoadedProducts(responseData.products);
        setisloading(false);
      } catch (err) {
        setError(err.message || "failed to fetch products");
        throw err;
      }

    }
    fetchUserProducts();

  }, [userId]);



  function deletePlace(deleteid) {
    return (prevProduct => {
      return prevProduct.filter(p => p.id !== deleteid)
    })
  }

  const clearError = () => {
    setError(null);
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loading && <LoadingSpinner asOverlay />}
      {loadedProducts && <ProductList items={loadedProducts} ondelete={deletePlace} />}
    </React.Fragment>
  )

}

export default Products;