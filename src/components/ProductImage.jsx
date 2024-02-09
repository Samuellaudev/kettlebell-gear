import { useGetProductImageQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';

const ProductImage = ({ product, customClass }) => {
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
