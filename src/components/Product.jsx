import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="my-4 p-3 rounded bg-white shadow-md">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-auto" />
      </Link>

      <div className="p-3">
        <Link to={`/product/${product._id}`} className="text-blue-500 hover:underline">
          <h2 className="text-lg font-semibold">{product.name}</h2>
        </Link>
        <div className="mt-2">
          <span className="text-lg font-bold">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;