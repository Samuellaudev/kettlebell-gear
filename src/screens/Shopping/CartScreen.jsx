import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import ProductImage from '../../components/ProductImage';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const CartItem = ({ item, addToCartHandler, removeFromCartHandler }) => (
    <li className="py-4 md:mr-6 flex items-center">
      <ProductImage product={item } alt={item.name} customClass="w-1/4 md:w-1/5 rounded-md mr-4 self-start" />
      
      <div className='w-full flex flex-col md:flex-row items-left md:items-center justify-around space-y-2'>
        <Link to={ `/product/${ item._id }` } className="text-blue-500">{ item.name }</Link>
        <p className='font-medium text-gray-600'>
          ${ item.price }
        </p>
      
      
        <div className="flex md:w-5/12">
          <select
            value={item.qty}
            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
            className="appearance-none block bg-white w-1/5 text-center py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="text-blue-500 ml-6"
            onClick={() => removeFromCartHandler(item._id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </li>
  );

  const CartSummary = ({ cartItems, checkoutHandler }) => (
    <div className='w-full md:w-4/12 md:mx-auto mt-6 md:mt-0'>
      <div className="border border-gray-200 rounded-lg p-4">
        <ul className="divide-y divide-gray-200">
          <li className="py-4">
            <h2 className="text-lg font-semibold">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            <span className="text-gray-700 block">
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </span>
          </li>
          <li className="py-4">
            <button
              type="button"
              className={`w-full py-2 bg-blue-500 text-white font-semibold rounded ${
                cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Shopping Cart</h2>
      </div>
        <div className='flex flex-col md:flex-row md:justify-between'>
          { cartItems.length === 0 ? (
            <div className='w-full flex items-start justify-start space-y-2'>
              <Message>
                Your cart is empty. <Link to="/" className="text-blue-500">Go Back</Link>
              </Message>
              </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  addToCartHandler={addToCartHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </ul>
          ) }
          <CartSummary cartItems={ cartItems } checkoutHandler={ checkoutHandler } />
        </div>
    </div>
  )
};
export default CartScreen;