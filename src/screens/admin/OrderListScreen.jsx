import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-gray-800 ">Orders</h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>{error?.data.message}</Message>
      ) : (
      <>
        <div className="flex flex-col mt-6 px-4 md:px-0">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center rtl:text-right text-gray-500">
                        ID
                      </th>
                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                        USER
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                        DATE
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                        TOTAL
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                        PAID
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                        DELIVERED
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{order._id}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{order.user && order.user.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{order.createdAt.substring(0, 10)}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">${order.totalPrice}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes className="text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <FaTimes className="text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <Link to={`/order/${order._id}`} className="text-blue-500 hover:underline">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Paginate pages={ orders.pages } page={ orders.page } isAdmin={ true } />
      </>
      )}
    </div>
  );
};

export default OrderListScreen;
