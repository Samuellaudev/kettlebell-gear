import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks'
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';
import { errorMessage, isFetchBaseQueryError, isErrorWithMessage } from '../../utils/helpers';
import { Product, OrderItem} from '../../shared.types'

import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ProductImage from '../../components/ProductImage';
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useAppDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // Access all properties of `FetchBaseQueryError` here
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
        toast.error(errMsg)
      } else if (isErrorWithMessage(err)) {
        // Access a string 'message' property here
        toast.error(err.message)
      }
    }
  };  

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-8/12 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
          <div className="bg-white p-4">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <p className="font-medium text-gray-600">
              <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white p-4">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <p className='font-medium text-gray-600'>
              Method: { cart.paymentMethod }
            </p>
          </div>

          <div className="bg-white p-4">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
                <ul>
                  {cart.cartItems.map((item, index) => (
                    <li key={index} className="bg-white mb-4">
                      <div className="flex items-center">
                        <ProductImage product={item } customClass="w-16 rounded-md mr-4" />
                        <div>
                          <Link to={`/product/${item._id}`} className="text-blue-500 font-semibold">{item.name}</Link>
                          <p className='font-medium text-gray-600'>
                            { item.qty } x ${ item.price } = ${ (item.qty! * (item.price * 100)) / 100 }
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        <div className="w-full md:w-4/12 mt-8 md:mt-0 md:ml-8 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${cart.taxPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>${cart.totalPrice}</span>
            </div>
            <div className="my-4">
              <button
                type='button'
                className='bg-blue-500 text-white py-2 px-4 w-full rounded-md cursor-pointer disabled:opacity-50'
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
              { isLoading ? (
                <Loader customClass='p-4 my-4'/>
              ) : error ? (
                errorMessage(error)
              ) : null
              }
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default PlaceOrderScreen;
