import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ProductImage from '../../components/ProductImage';
import {
  usePayOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation
} from '../../slices/ordersApiSlice';
import { toast } from 'react-toastify';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

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

  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered')
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='error'>{error.data.message}</Message>
  ) : (
    <div className="container px-4 py-8 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Order { order._id }</h2>
      </div>
      <div className='flex flex-col md:flex-row md:justify-between'>
        {/* Order */}
        <div className='w-full md:w-7/12 border p-4 rounded-md'>
          <div className="bg-white border-b-[1.5px] pb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <p className="font-medium text-gray-600 mb-2">
              <strong>Name:</strong> { order.user.name }
              </p>
            <p className="font-medium text-gray-600 mb-2">
              <strong>Email:</strong> <a href={ `mailto:${ order.user.email }` }>{ order.user.email }</a>
            </p>
            <p className="font-medium text-gray-600 mb-2">
              <strong>Address:</strong> { order.shippingAddress.address }, { order.shippingAddress.city } { order.shippingAddress.postalCode }, { order.shippingAddress.country }
                </p>
            <div className='mt-4'>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant='warning'>Not Delivered</Message>
              ) }
            </div>
          </div>

          <div className="bg-white mt-4 border-b-[1.5px] pb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <p className="font-medium text-gray-600 mb-2">
              <strong>Method:</strong> { order.paymentMethod }
            </p>
            
            <div className='mt-4'>
              { order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='warning'>Not Paid</Message>
            )}
            </div>
          </div>

          <div className="bg-white mt-4">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index} className="bg-white mb-4">
                    <div className="flex items-center">
                      <ProductImage product={item } alt={item.name} customClass="w-16 rounded-md mr-4" />
                      <div>
                        <Link to={`/product/${item.product}`} className="text-blue-500 font-semibold">{item.name}</Link>
                        <p className='font-medium text-gray-600'>
                          { item.qty } x ${ item.price } = ${ (item.qty * item.price).toFixed(2) }
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className='w-full md:w-4/12 md:mx-auto mt-6 md:mt-0'>
          <div className="bg-white p-4 rounded border">
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

            <div className='mt-6'>
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
              ) }
            </div>

            {loadingDeliver && <Loader />}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div>
                  <button
                    type='button'
                    className='bg-blue-500 text-white py-2 px-4 w-full rounded-md cursor-pointer'
                    onClick={deliverOrderHandler}
                  >
                    Mark As Delivered
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
