import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber
  });

  return (
    <>
      { isLoading ? (
        <Loader customClass='mt-20'/>
      ) : error ? (
        <Message variant='error'>{ error?.data.message || error?.error }</Message>
      ) : (
        <>
          <h1 className="text-3xl font-bold my-4 mt-6">Latest Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            { data.products.map((product) => (
              <div key={ product._id }>
                <Product product={ product } />
              </div>
            )) }
          </div>
          <Paginate pages={data.pages} page={data.page} />
        </>)
      }
    </>
  )
};

export default HomeScreen;
