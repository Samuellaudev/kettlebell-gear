import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation
} from '../../slices/productsApiSlice';
import { errorMessage, isFetchBaseQueryError, isErrorWithMessage } from '../../utils/helpers';
import { Product as ProductType } from '../../shared.types'
import { initialDialogValue } from '../../utils/constants'

import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { pageNumber = '', keyword = '' } = useParams<{ pageNumber: string; keyword: string }>();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
    keyword
  });

  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<{ 
    title: string; 
    body?: string; 
    yesButtonText: string; 
    noButtonText: string; 
    handleYesClick: () => void; 
    handleNoClick: () => void; 
  }>(initialDialogValue);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCreateClick = () => {
    setDialog({
      title: 'Are you sure you want to create a new product?',
      handleYesClick: createProductHandler,
      yesButtonText: 'Yes',
      handleNoClick: closeModal,
      noButtonText: 'No',
    })
    openModal()
  }

  const [createProduct, { isLoading: loadingCreate }] =
  useCreateProductMutation();

  const createProductHandler = async () => {
      try {
        await createProduct();
        refetch();

        closeModal()
        toast.success('Product created successfully')
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

  const handleDeleteClick = (product: ProductType) => {
    setDialog({
      title: `Are you sure you want do delete '${product.name}'?`,
      handleYesClick: () => deleteHandler(product),
      yesButtonText: 'Yes',
      handleNoClick: closeModal,
      noButtonText: 'No',
    })
    openModal()
  }

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  
    const deleteHandler = async (product: ProductType) => {
        try {
          await deleteProduct(product._id);
          refetch();

          closeModal()
          toast.success('Product deleted successfully')
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

  return (
    <>
      <Modal
        isOpen={ isOpen }
        openModal={openModal}
        closeModal={ closeModal }
        dialog={ dialog }
      />
      <div className="container px-4 py-8 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-lg font-medium text-gray-800 ">Products</h2>
          <div className="flex items-center mt-4">
            <button
              onClick={handleCreateClick}
              disabled={loadingCreate}
              className="flex items-center w-auto px-4 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto  hover:bg-gray-100 ">
                  <FaPlus className="mr-2" /> Create Product
              </button>
          </div>
        </div>

        {isLoading || loadingCreate || loadingDelete ? (
          <Loader customClass='min-h-screen my-4'/>
        ) : error ? (
          errorMessage(error)
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
                            PRICE
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                          CATEGORY
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                          BRAND
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data?.products.map((product) => (
                        <tr key={product._id}>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{product._id}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{product.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">${product.price}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{product.category}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{product.brand}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap flex space-x-4 justify-center items-center">
                            <Link to={`/admin/product/${product._id}/edit`} className="btn btn-secondary mr-2">
                            <FaEdit className='my-[0.5rem]'/>
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(product)}
                              disabled={loadingDelete}
                            >
                              <FaTrash className='text-xl p-1 bg-red-500 text-white rounded-md'/>
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
          {data && <Paginate pages={ data?.pages } page={ data?.page } isAdmin={ true } />}
        </>
        )}
      </div>
    </>
  );
};

export default ProductListScreen;
