import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
      <p className='text-center mb-4'>Congratulation! Your order has been placed.</p>
      <Link className='btn btn-success' onClick={() => navigate(-1)}>Go Back</Link>
    </div>
  );
};

export default OrderPlaced;
