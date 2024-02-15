import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks'

import { saveShippingAddress } from '../../slices/cartSlice';
import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
import FormInput from '../../components/Form/FormInput';

const ShippingScreen = () => {
  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600">Shipping</h3>
          <form onSubmit={submitHandler}>
            <div className="w-full mt-4">
              <label htmlFor="address">Address</label>
              <FormInput
                id="address"
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                ariaLabel="Address"
                required={true}
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="city">City</label>
              <FormInput
                id="city"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                ariaLabel="City"
                required={true}
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="city">Postal Code</label>
              <FormInput
                id="postalCode"
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                ariaLabel="Postal Code"
                required={true}
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="city">Country</label>
              <FormInput
                id="country"
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                ariaLabel="Country"
                required={true}
              />
            </div>

            <div className="flex items-center justify-center my-4">
              <button
                type="submit"
                className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                  Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default ShippingScreen;
