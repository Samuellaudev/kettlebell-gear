import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const navigate = useNavigate();
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-3xl font-semibold mb-4">Edit User</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="my-2">
              <label htmlFor="name" className="block">Name</label>
              <input
                type='name'
                id='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 bg-white p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="my-2">
              <label htmlFor="email" className="block">Email Address</label>
              <input
                type='email'
                id='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-white p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="my-2">
              <label htmlFor="isAdmin" className="block">Is Admin</label>
              <input
                type='checkbox'
                id='isAdmin'
                checked={isAdmin}
                onChange={ (e) => setIsAdmin(e.target.checked) }
                className="size-3 appearance-none checked:appearance-auto rounded-sm border border-slate-300 accent-blue-300 dark:accent-blue-400"
              />
            </div>
            <button
              type='submit'
              className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
