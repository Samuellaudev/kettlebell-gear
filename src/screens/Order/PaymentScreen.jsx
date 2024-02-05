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
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
            Payment Method
          </h3>
          <form onSubmit={submitHandler}>
            <div className="w-full mt-4">
              <label htmlFor="selectMethod" className='block mb-2'>Select Method</label>
                <div className="inline-flex items-center">
                  <input
                    id="selectMethod"
                    type="radio"
                    value='PayPal'
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    aria-label="Payment Method"
                    required={true}
                  />
                  <span className="ml-2">PayPal or Credit Card</span>
                </div>
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

export default PaymentScreen;
