import Product from '../components/Product';
import products from '../products';

const HomeScreen = () => {
  return (
    <>
      <h1 className="text-3xl font-bold my-4 mt-6">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
