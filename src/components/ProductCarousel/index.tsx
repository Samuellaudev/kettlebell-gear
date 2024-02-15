import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useGetTopProductsQuery } from '../../slices/productsApiSlice';
import ProductImage from '../ProductImage';
import Loader from '../Loader';
import styles from './carousel.module.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { errorMessage } from '../../utils/helpers'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "ease-in-out",
    arrows: false,
    dotsClass: 'slick-dots bottom-[-25px]',
  };

  return (
    <div className='mt-28'>
      <span className="flex items-center">
        <span className="h-px flex-1 bg-gray-600"></span>
          <span className="shrink-0 px-6">
            <h1 className="text-4xl font-bold my-8 mt-6 italic text-center">BEST SELLERS</h1>
          </span>
        <span className="h-px flex-1 bg-gray-600"></span>
      </span>
      <div className='flex flex-row'>
        <div className='hidden bg-black md:block md:w-full border-r-2 '>
          <img
            className="w-auto"
            src="/images/carousel_left.png"
            alt="Carousel Left Image"
          />
        </div>
        { isLoading ? (
          <Loader customClass='min-h-full' />
        ) : error ? (
          errorMessage(error)
        ) : (
          <div className='w-full md:w-1/2 mx-auto -mb-1.5'>
            <Slider { ...settings }>
              {products?.map((product) => (
                <div key={product._id} className='carousel-item relative'>
                  <Link to={ `/product/${ product._id }` }>
                    <ProductImage product={ product } customClass='w-full mx-auto' />
                    <div className={styles.carousel_caption}>
                      <span className='block text-white p-6 text-lg md:text-xl'>
                        {product.name} (${product.price})
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        )}
        <div className='hidden bg-black md:block md:w-full border-l-2'>
          <img
            className="w-auto"
            src="/images/carousel_right.png"
            alt="Carousel Right Image"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
