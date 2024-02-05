import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';
import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
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
      console.log('res', res);
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };  

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex">
        <div className="w-8/12">
          <div className="bg-white p-4">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <p className="mb-4">
              <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white p-4 mt-4">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <p><strong>Method:</strong> {cart.paymentMethod}</p>
          </div>

          <div className="bg-white p-4 mt-4">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul>
                {cart.cartItems.map((item, index) => (
                  <li key={index} className="bg-white p-4 mb-4">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md mr-4" />
                      <div>
                        <Link to={`/product/${item.product}`} className="text-blue-500 font-semibold">{item.name}</Link>
                        <p>{item.qty} x ${item.price} = ${(item.qty * (item.price * 100)) / 100}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="w-4/12 ml-8">
          <div className="bg-white p-4 shadow">
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
            <div>
              {error && (
                <Message variant='danger'>{error?.data.message}</Message>
              )}
            </div>
            <div className="mt-4">
              <button
                type='button'
                className='bg-blue-500 text-white py-2 px-4 w-full rounded-md cursor-pointer disabled:opacity-50'
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default PlaceOrderScreen;
