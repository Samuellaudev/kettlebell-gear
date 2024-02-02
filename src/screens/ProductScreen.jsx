import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useGetProductDetailsQuery, useGetProductImageQuery } from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  
  const imageName = product ? product.image.name : ''
  const { data: imgData, isLoading: imgLoading, error: imgError } = useGetProductImageQuery(imageName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  return (
    <>
      <Link
        to="/"
        className="inline-block py-2 px-4 mt-6 mb-2 border rounded hover:bg-black hover:text-white transition duration-200"
      >
        Go Back
      </Link>
      { isLoading ? (
        <Loader customClass='mt-20'/>
      ) : error ? (
        <Message variant='error'>{ error?.data.message || error?.error }</Message>
        ) : (
          <>
            <div className="grid grid-cols-12 gap-2">
              <div className="w-full col-span-full md:col-span-5 py-4">
                { imgLoading? <Loader /> : (
                  <img src={ imgData.url } alt={ product.name } className="rounded-md" />
                )}
              </div>
              <div className="w-full col-span-full md:col-span-4 p-4">
                <h3 className="text-3xl font-semibold mb-2">{ product.name }</h3>
                <Rating value={ product.rating } text={ `${ product.numReviews } reviews` } />
                <p className="mb-2 text-lg">Price: ${ product.price }</p>
                <p className="mb-4 text-lg">Description: { product.description }</p>
              </div>
              <div className="w-full col-span-full md:col-span-2">
                <div className="border rounded-md p-4">
                  <p className="mb-2">
                    Price: <strong>${ product.price }</strong>
                  </p>
                  <p className="mb-2">
                    Status: { product.countInStock > 0 ? 'In Stock' : 'Out Of Stock' }
                  </p>
                  {
                    product.countInStock > 0 && (
                      <div className="border-t border-gray-200 py-3">
                        <div className="flex items-center justify-space">
                          <div className="text-base">Qty</div>
                          <div className="ml-3">
                            <select
                              className="appearance-none border border-gray-300 rounded-md py-1 px-2 bg-white focus:outline-none focus:border-blue-500"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  <button
                    className={ `w-full py-2 px-4 rounded-md ${ product.countInStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white' }` }
                      disabled={ product.countInStock === 0 }
                      onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
          </div>
          </>
        )
      }
    </>
  );
};

export default ProductScreen;
