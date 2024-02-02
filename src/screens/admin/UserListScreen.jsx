import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">EMAIL</th>
              <th className="px-4 py-2">ADMIN</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="border px-4 py-2">
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500 mx-auto" />
                  ) : (
                    <FaTimes className="text-red-500 mx-auto" />
                  )}
                </td>
                <td className="border px-4 py-2 flex space-x-4 justify-center items-center">
                  <Link to={`/admin/user/${user._id}/edit`} className="btn btn-light mr-2">
                    <FaEdit className='my-[0.5rem]'/>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash className='text-xl p-1 bg-red-500 text-white rounded-sm'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;
