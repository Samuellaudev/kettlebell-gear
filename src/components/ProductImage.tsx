import { useGetProductImageQuery } from '../slices/productsApiSlice';
import { Product as ProductType } from '../shared.types'
import Loader from './Loader';

interface ProductImageProps {
  // product: {
  //   name: string;
  //   image: {
  //     name: string;
  //   },
  // };
  product: ProductType;
  customClass?: string;
}

const ProductImage = ({ product, customClass }: ProductImageProps) => {
  const imageName = product?.image?.name || '';
  const { data: imgData, isLoading: imgLoading, error: imgError } = useGetProductImageQuery(imageName);

  return (
    <>
      {imgLoading ? (
        <Loader customClass='p-10' />
      ) : (
          <img
            src={ imgData?.url }
            alt={ product?.name }
            className={`${customClass}`}
          />
      )}
    </>
  );
};

export default ProductImage;