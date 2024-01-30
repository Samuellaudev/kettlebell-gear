import { Link } from 'react-router-dom';
import Rating from '../Rating';
import styles from './product.module.css'

const Product = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden my-3">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-auto" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`} className="text-blue-500 hover:underline">
          <h2 className={`${styles.product_title} text-lg font-semibold`}>{product.name}</h2>
        </Link>
        <div className="flex items-center">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <h3 className="text-lg font-bold">${product.price}</h3>
      </div>
    </div>
  );
};

export default Product;
