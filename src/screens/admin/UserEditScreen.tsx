import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import { errorMessage, isFetchBaseQueryError, isErrorWithMessage } from '../../utils/helpers';

import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';

const UserEditScreen = () => {
  const { id: userId = '' } = useParams();

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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
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

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-4">
      <Link
        to='/admin/userlist'
        className="inline-block py-2 px-4 mt-6 mb-2 border rounded hover:bg-black hover:text-white transition duration-200"
      >
        Go Back
      </Link>
      <FormContainer>
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 capitalize ">Edit User</h2>

          {isLoading ? (
            <Loader customClass='min-h-screen my-4'/>
          ) : error ? (
            errorMessage(error)
          ) : (
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700" htmlFor="name">Name</label>
                <input
                  type='name'
                  id='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
              </div>

              <div>
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

              <div>
                <label htmlFor="isAdmin" className="block">Is Admin</label>
                <input
                  type='checkbox'
                  id='isAdmin'
                  checked={isAdmin}
                  onChange={ (e) => setIsAdmin(e.target.checked) }
                  className="size-3 appearance-none checked:appearance-auto rounded-sm border border-slate-300 accent-blue-300 dark:accent-blue-400"
                />
              </div>
            </div>

            <div className="flex mt-6">
              <button
                type='submit'
                className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
          ) }
        </div>
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
