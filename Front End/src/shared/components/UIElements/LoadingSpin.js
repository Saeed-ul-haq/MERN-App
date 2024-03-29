import React from 'react';

import './LoadingSpin.css';

const LoadingSpinner = props => {
  return (
    <div className={`${'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
