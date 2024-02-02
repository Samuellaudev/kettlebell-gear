import { Link } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Product created successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  
    const deleteHandler = async (product) => {
      if (window.confirm(`Are you sure you want do delete '${product.name}'`)) {
        try {
          await deleteProduct(product._id);
          refetch();
          toast.success('Product deleted')
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Products</h1>
        <button
          onClick={createProductHandler}
          className="flex items-center px-4 py-1 border-2 rounded-md"
          disabled={loadingCreate}
        >
          <FaPlus className="mr-2" /> Create Product
        </button>
      </div>
      
      { loadingCreate && <Loader /> }
      { loadingDelete && <Loader /> }

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>{error?.data.message}</Message>
      ) : (
        <>
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">NAME</th>
                <th className="px-4 py-2">PRICE</th>
                <th className="px-4 py-2">CATEGORY</th>
                <th className="px-4 py-2">BRAND</th>
                <th className="px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product._id}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">{product.category}</td>
                  <td className="border px-4 py-2">{product.brand}</td>
                  <td className="border px-4 py-2 flex space-x-4 justify-center items-center">
                    <Link to={`/admin/product/${product._id}/edit`} className="btn btn-secondary mr-2">
                    <FaEdit className='my-[0.5rem]'/>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHandler(product)}
                      disabled={loadingDelete}
                    >
                        <FaTrash className='text-xl p-1 bg-red-500 text-white rounded-sm'/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
