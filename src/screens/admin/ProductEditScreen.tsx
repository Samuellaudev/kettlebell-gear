import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation
} from '../../slices/productsApiSlice';
import { errorMessage, isFetchBaseQueryError, isErrorWithMessage, modifiedImageName, originalImageName } from '../../utils/helpers';

import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';

const ProductEditScreen = () => {
  const { id: productId = '' } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  
  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { target } = e
    if (!target || !(target instanceof HTMLInputElement)) return;
  
    const file = target.files?.[0]
    if (!file) return;

    setImage(file)
  }

  const uploadImageHandler = async () => {
    let newImage
    if (image?.name) {
        newImage = new File(
        [image],
        modifiedImageName(productId, image?.name),
        {
          type: image.type,
          lastModified: image.lastModified,
        },
      );
    }

    const formData = new FormData();
    formData.append('image', newImage);

    try {
      await uploadProductImage(formData).unwrap();
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
  

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image: {
          name: modifiedImageName(productId, image?.name),
          type: image?.type!,
          lastModified: image?.lastModified ? new Date(image.lastModified).toString() : '',
        },
        brand,
        category,
        description,
        countInStock,
      });

      await uploadImageHandler()

      toast.success('product updated successfully');
      refetch();
      navigate('/admin/productlist');
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
    <div className="container mx-auto px-4 py-6">
      <Link
        to='/admin/productlist'
        className="inline-block py-2 px-4 mt-6 border rounded hover:bg-black hover:text-white transition duration-200"
      >
        Go Back
      </Link>
      <FormContainer>
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 capitalize ">Edit Product</h2>
          {isLoading || loadingUpdate ? (
            <Loader customClass='min-h-screen my-4'/>
          ) : error ? (
            errorMessage(error)
          ) : (
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 mt-4">
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

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type='number'
                  id='price'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  disabled
                  value={originalImageName(image?.name)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  className='mt-1 pt-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type='text'
                id='brand'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type='text'
                id='category'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type='text'
                id='description'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-6">
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

export default ProductEditScreen;
