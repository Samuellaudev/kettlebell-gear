import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormInput from '../../components/Form/FormInput';

import { useProfileMutation } from '../../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center mb-10">
      {/* User Profile */}
      <div className="mt-10 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600">User Profile</h3>
          <form onSubmit={submitHandler}>
            <div className="w-full mt-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <FormInput
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ariaLabel="Name"
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <FormInput
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ariaLabel="Email Address"
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <FormInput
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ariaLabel="Password"
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <FormInput
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                ariaLabel="Confirm Password"
              />
            </div>

            <div className="flex items-center justify-center my-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                  Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* My Orders */}
      <div className="mt-10 w-full md:mx-12">
        <h3 className="mt-3 text-xl font-medium text-center text-gray-600">My Orders</h3>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='error'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="flex flex-col mt-6 px-4 md:px-0">
            <div className=" -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center rtl:text-right text-gray-500">
                          ID
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
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
