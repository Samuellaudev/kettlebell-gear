import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useGetTopProductsQuery } from '../../slices/productsApiSlice';
import ProductImage from '../ProductImage';
import Loader from '../Loader';
import Message from '../Message';
import styles from './carousel.module.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    appendDots: dots => <ul className='text-white'>{dots}</ul>
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='error'>{error?.data?.message || error.error}</Message>
  ) : (
    <div className='flex flex-row'>
      <div className='hidden bg-black md:block md:w-full'>test</div>
      <div className='w-full md:w-1/2 mx-auto -mb-1.5'>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className='carousel-item relative'>
              <Link to={ `/product/${ product._id }` }>
                <ProductImage product={ product } customClass='w-full mx-auto' />
                <div className={styles.carousel_caption}>
                  <span className='block text-white p-6 text-3xl'>
                    {product.name} (${product.price})
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <div className='hidden bg-black md:block md:w-full'>test</div>
    </div>
  );
};

export default ProductCarousel;
