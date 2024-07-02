// import { useGetProductImageQuery } from '../slices/productsApiSlice';
import { Product as ProductType } from '../shared.types'
import Loader from './Loader';

interface ProductImageProps {
  product: ProductType;
  customClass?: string;
}

const ProductImage = ({ product, customClass }: ProductImageProps) => {
  const imageUrl = product?.image?.url || '';
  // const imageName = product?.image?.name || '';
  // const { data: imgData, isLoading: imgLoading, error: imgError } = useGetProductImageQuery(imageName);

  return (
    <>
      {/* {imgLoading ? (
        <Loader customClass='p-10' />
      ) : ( */}
          <img
            src={ imageUrl }
            alt={ product?.name }
            className={`${customClass}`}
          />
      {/* )} */}
    </>
  );
};

export default ProductImage;