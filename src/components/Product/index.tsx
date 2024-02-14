import { Product as ProductType } from '../../shared.types'
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import styles from './product.module.css';
import ProductImage from '../ProductImage';

interface ProductProp {
  product: ProductType;
}

const Product = ({ product }: ProductProp) => {
  const checkCountInStock = () => {
    return (
      product.countInStock > 0
        ? <span className='bg-green-500 text-white px-2 py-1 text-xs rounded-md'>IN STOCK</span>
        : <span className='bg-gray-500 text-white px-2 py-1 text-xs rounded-md'>OUT OF STOCK</span>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden my-3 border-2 text-center">
      <Link to={`/product/${product._id}`}>
        <ProductImage product={ product } />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`} className="text-black hover:underline">
          <h2 className={`${styles.product_title} text-lg font-semibold`}>{product?.name}</h2>
        </Link>
        {checkCountInStock()}
        <h3 className="text-lg pt-2">£{product?.price}</h3>
        <div className="flex justify-center">
          <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
        </div>
      </div>
    </div>
  );
};

export default Product;
