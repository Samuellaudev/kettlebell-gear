import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  return (
    <>
      <Link
        to="/"
        className="inline-block py-2 px-4 mt-6 mb-2 border rounded hover:bg-black hover:text-white transition duration-200"
      >
        Go Back
      </Link>
      { isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{ error?.data.message || error.error }</div>
        ) : (
          <>
            <div className="grid grid-cols-12 gap-2">
              <div className="w-full col-span-full md:col-span-5 py-4">
                <img src={ product.image } alt={ product.name } className="rounded-md" />
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
                  <button
                    className={ `w-full py-2 px-4 rounded-md ${ product.countInStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white' }` }
                    disabled={ product.countInStock === 0 }
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
