import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../slices/cartSlice';
import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);
  
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };  

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-3xl font-bold mb-4">Payment Method</h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-2">Select Method</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">PayPal or Credit Card</span>
            </label>
          </div>
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
