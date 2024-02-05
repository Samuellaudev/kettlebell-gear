import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import Modal from '../../components/Modal';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState({})

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  const handleDeleteClick = (user) => {
    setDialog({
      title: `Are you sure you want do delete '${user.name}'?`,
      handleYesClick: () => deleteHandler(user),
      yesButtonText: 'Yes',
      handleNoClick: closeModal,
      noButtonText: 'No',
    })
    openModal()
  }

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (user) => {
      try {
        await deleteUser(user._id);
        refetch();

        closeModal()
        toast.success('User deleted successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        dialog={ dialog }
        handleYesClick={dialog.handleYesClick}
        handleNoClick={dialog.handleNoClick}
      />
      <div className="container px-4 py-8 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-lg font-medium text-gray-800 ">Users</h2>
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
                          NAME
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                          EMAIL
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                          REGISTRATION DATE
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                          ADMIN
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{user._id}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{user.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{user.createdAt.substring(0, 10)}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {user.isAdmin ? (
                              <FaCheck className="text-green-500 mx-auto" />
                            ) : (
                              <FaTimes className="text-red-500 mx-auto" />
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap flex space-x-4 justify-center items-center">
                            <Link to={`/admin/user/${user._id}/edit`} className="btn btn-light mr-2">
                              <FaEdit className='my-[0.5rem]'/>
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteClick(user)}
                            >
                              <FaTrash className='text-xl p-1 bg-red-500 text-white rounded-sm'/>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Paginate pages={ users.pages } page={ users.page } isAdmin={ true } />
        </>
        )}
      </div>
    </>
  );
};

export default UserListScreen;
