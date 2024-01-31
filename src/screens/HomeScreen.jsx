import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      { isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{ error?.data.message || error.error }</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold my-4 mt-6">Latest Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            { products.map((product) => (
              <div key={ product._id }>
                <Product product={ product } />
              </div>
            )) }
          </div>
        </>)
      }
    </>
  )
};

export default HomeScreen;
