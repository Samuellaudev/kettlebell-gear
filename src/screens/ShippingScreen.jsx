import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <h1 className="text-3xl font-bold mb-4">Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className="my-2">
          <label htmlFor="address" className="block mb-1">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="my-2">
          <label htmlFor="city" className="block mb-1">City</label>
          <input
            id="city"
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="my-2">
          <label htmlFor="postalCode" className="block mb-1">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="my-2">
          <label htmlFor="country" className="block mb-1">Country</label>
          <input
            id="country"
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600">Continue</button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
