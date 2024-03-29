import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks'
import { errorMessage, isFetchBaseQueryError, isErrorWithMessage } from '../../utils/helpers';

import { addToCart } from '../../slices/cartSlice';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation
} from '../../slices/productsApiSlice';
import ProductImage from '../../components/ProductImage';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import Breadcrumb from '../../components/Breadcrumb';
import BackToTop from '../../components/Utility/BackToTop';
import { toast } from 'react-toastify';

const ProductScreen = () => {
  const { id: productId = '' } = useParams <{ id: string }>();
  const {
    data: product,
    isLoading,
    error,
    refetch
  } = useGetProductDetailsQuery(productId || '');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    if (!product) return;

    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  const { userInfo } = useAppSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
  useCreateReviewMutation();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
  
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // Access all properties of `FetchBaseQueryError` here
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
        toast.error(errMsg)
      } else if (isErrorWithMessage(err)) {
        // Access a string 'message' property here
        toast.error(err.message)
      }
    } finally {
      setRating(0)
      setComment('')
    }
  };

  const renderLoaderOrError = () => {
    if (isLoading) return <Loader customClass='my-4 min-h-screen'/>;
    if (error) return errorMessage(error)
    return null;
  };

  const renderQtySelect = () => {
    if (product?.countInStock && product?.countInStock > 0) {
      return (
        <div className="border-t border-gray-200 py-3">
          <div className="flex items-center justify-space">
            <div className="text-base">Qty</div>
            <div className="ml-3">
              <select
                className="appearance-none border border-gray-300 rounded-md py-1 px-2 bg-white focus:outline-none focus:border-blue-500"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(product?.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderReviewForm = () => {
    return (
      <div className="py-4 marker:text-white md:w-2/6">
        <h2 className="text-xl font-bold text-gray-600">Write a Customer Review</h2>
        {loadingProductReview && <Loader />}
        {userInfo ? (
          <form onSubmit={submitHandler} className="mt-4">
            <div className="my-2 text-gray-600">
              <label htmlFor="rating" className="block text-sm font-semibold">Rating</label>
              <select
                id="rating"
                required
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value, 10))}
                className="appearance-none mt-1 px-2 bg-white border p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Select...</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div className="my-2 text-gray-600">
              <label htmlFor="comment" className="block text-sm font-semibold">Comment</label>
              <textarea
                id="comment"
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 bg-white border p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              ></textarea>
            </div>
            <button
              disabled={loadingProductReview}
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </form>
        ) : (
          <Message>
            Please <Link to="/login" className="text-blue-500">sign in</Link> to write a review
          </Message>
        )}
      </div>
    );
  };

  const paths = [
    { title: 'Home', link: '/' },
    { title: 'Shop', link: '/shop' },
    { title: 'Product', link: `/product/${productId}` },
  ];

  return (
    <>
      <Breadcrumb paths={ paths } />
      <BackToTop />
      <button
        onClick={() => navigate(-1)}
        className="inline-block py-2 px-4 mt-6 mx-4 md:mx-0 border rounded hover:bg-black hover:text-white transition duration-200"
      >
        Go Back
      </button>
      {renderLoaderOrError()}
      {!isLoading && !error && (
        <>
          <Meta title={product?.name} />
          <div className="grid grid-cols-12 gap-2">
            <div className="w-full p-4 md:py-6 md:px-0 col-span-full md:col-span-5">
              {product && <ProductImage product={ product } customClass='rounded-md'/>}
            </div>
            {/* Product Details */}
            <div className="w-full col-span-full md:col-span-4 p-4 text-gray-600">
              <h3 className="text-3xl font-semibold mb-2">{ product?.name }</h3>
              <Rating value={ product?.rating ?? 0 } text={ `${ product?.numReviews } reviews` } />
              <p className="mb-2 text-lg">Price: ${ product?.price }</p>
              <p className="mb-4 text-lg">Description: { product?.description }</p>
            </div>
            {/* Price */}
            <div className="w-full p-4 md:p-0 col-span-full md:col-span-2 text-gray-600">
              <div className="border rounded-md p-4">
                <p className="mb-2">
                  Price: <strong>${ product?.price }</strong>
                </p>
                <p className="mb-2">
                  Status: { product?.countInStock && product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock' }
                </p>
                {renderQtySelect()}
                <button
                  className={ `w-full py-2 px-4 rounded-md ${ product?.countInStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white' }` }
                    disabled={ product?.countInStock === 0 }
                    onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full p-4 md:p-0 md:w-full">
              <h2 className="text-3xl pt-16 pb-4 font-semibold text-gray-600 text-center md:text-center italic">CUSTOMER REVIEWS</h2>
              <div className='flex flex-col md:flex-row md:space-x-14'>
                { renderReviewForm() }
                <div className='customer-reviews w-4/6'>
                  <div className='pt-4'>
                    { product?.reviews?.length === 0 && <Message>No Reviews</Message> }
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {product?.reviews?.map((review) => (
                      <li key={review._id} className="md:py-7">
                        <div className="font-semibold text-gray-600">{review.name}</div>
                        <Rating value={review.rating} />
                        <p className="text-sm text-gray-500">{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
