import React from 'react';
import { NavLink } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-4">
      <NavLink
        to="/login"
        className={`px-1 md:px-4 py-2 rounded-md ${
          step1 ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`}
      >
        Sign In
      </NavLink>
      <img 
        src='/svg/checkoutSteps_arrow.svg'
        className="my-auto w-auto h-5 opacity-50"
      />

      <NavLink
        to="/shipping"
        className={`px-1 md:px-4 py-2 rounded-md ${
          step2 ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`}
      >
        Shipping
      </NavLink>
      <img 
        src='/svg/checkoutSteps_arrow.svg'
        className="my-auto w-auto h-5 opacity-50"
      />

      <NavLink
        to="/payment"
        className={`px-1 md:px-4 py-2 rounded-md ${
          step3 ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`}
      >
        Payment
      </NavLink>
      <img 
        src='/svg/checkoutSteps_arrow.svg'
        className="my-auto w-auto h-5 opacity-50"
      />

      <NavLink
        to="/placeorder"
        className={`px-1 md:px-4 py-2 rounded-md ${
          step4 ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`}
      >
        Place Order
      </NavLink>
    </nav>
  );
};

export default CheckoutSteps;
