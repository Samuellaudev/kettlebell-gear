import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

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
    <li className="py-4 flex items-center">
      <div className="md:w-2/12">
        <img src={item.image} alt={item.name} className="w-full rounded" />
      </div>
      <div className="md:w-3/12">
        <Link to={`/product/${item._id}`} className="text-blue-500">{item.name}</Link>
      </div>
      <div className="md:w-2/12">${item.price}</div>
      <div className="md:w-2/12 mr-4">
        <select
          value={item.qty}
          onChange={(e) => addToCartHandler(item, Number(e.target.value))}
          className="appearance-none block bg-white w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="md:w-2/12">
        <button
          type="button"
          className="text-blue-500"
          onClick={() => removeFromCartHandler(item._id)}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );

  const CartSummary = ({ cartItems, checkoutHandler }) => (
    <div className="md:w-4/12 mt-4 md:mt-0">
      <div className="border border-gray-200 rounded-lg p-4">
        <ul className="divide-y divide-gray-200">
          <li className="py-4">
            <h2 className="text-lg font-bold">
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
    <div className="flex flex-col md:flex-row">
      <div className="md:w-8/12 md:pr-4">
        <h1 className="text-3xl font-bold mb-5">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/" className="text-blue-500">Go Back</Link>
          </Message>
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
        )}
      </div>
      <CartSummary cartItems={cartItems} checkoutHandler={checkoutHandler} />
    </div>
  )
};
export default CartScreen;