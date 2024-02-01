import React from 'react';
import { NavLink } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-4">
      <NavLink
        to="/login"
        className={`px-4 py-2 mr-2 rounded-md ${
          step1 ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`}
        activeClassName="text-blue-500"
      >
        Sign In
      </NavLink>

      <NavLink
        to="/shipping"
        className={`px-4 py-2 mr-2 rounded-md ${
          step2 ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`}
        activeClassName="text-blue-500"
      >
        Shipping
      </NavLink>

      <NavLink
        to="/payment"
        className={`px-4 py-2 mr-2 rounded-md ${
          step3 ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`}
        activeClassName="text-blue-500"
      >
        Payment
      </NavLink>

      <NavLink
        to="/placeorder"
        className={`px-4 py-2 rounded-md ${
          step4 ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`}
        activeClassName="text-blue-500"
      >
        Place Order
      </NavLink>
    </nav>
  );
};

export default CheckoutSteps;
