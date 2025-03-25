import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

export const AppSpinner = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};
