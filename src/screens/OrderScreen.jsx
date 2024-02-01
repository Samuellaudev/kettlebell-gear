import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  usePayOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
} from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();  

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending'
        });
      };
      
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Order is paid');
  };

  const onError = (err) => {
    toast.error(err.message);
  };
  
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };  

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='error'>{error.data.message}</Message>
  ) : (
    <>
      <h1 className="text-2xl font-bold mb-4">Order {order._id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            {order.isDelivered ? (
              <Message variant='success'>Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message variant='warning'>Not Delivered</Message>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='warning'>Not Paid</Message>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index} className="bg-white p-4 mb-4 shadow">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md mr-4" />
                      <div>
                        <Link to={`/product/${item.product}`} className="text-blue-500 font-semibold">{item.name}</Link>
                        <p>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>${order.itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </div>

            { !order.isPaid && (
              <>
                { loadingPay && <Loader /> }
                {isPending ? (
                  <Loader />
                ) : (
                  <>
                    {/* THIS BUTTON IS FOR TESTING! */}
                    {/* <button
                      onClick={ onApproveTest }
                      className='p-3 my-3 bg-gray-600 text-white rounded-md'
                    >
                      Test Pay Order
                    </button> */}
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
