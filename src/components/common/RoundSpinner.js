import React from 'react';

const RoundSpinner = ({ size = 'medium', color = 'primary', message = '' }) => {
  const spinnerSizes = {
    small: 'spinner-border-sm',
    medium: '',
    large: 'spinner-border-lg',
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className={`spinner-border text-${color} ${spinnerSizes[size]}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default RoundSpinner;
