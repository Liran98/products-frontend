import React from 'react';

import '../STYLING/loadingspinner.css';

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
        <div className={`${props.AsProductLay && 'loading-spinner__add-products'}`}>

        
      <div className="lds-dual-ring"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;