import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Product from '../../components/Product';
import Loader from '../../components/Loader';
import ProductCarousel from '../../components/ProductCarousel';
import Meta from '../../components/Meta';
import BackToTop from '../../components/Utility/BackToTop';
import { IconContext } from "react-icons";
import { ImPower } from "react-icons/im";
import { errorMessage } from '../../utils/helpers'
import { Product as ProductType } from '../../shared.types'

const HomeScreen = () => {
  const { pageNumber = '', keyword = '' } = useParams<{ pageNumber: string; keyword: string }>();

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword
  })

  let latestProducts: ProductType[] = []
  if (!isLoading && data?.products) {
    const createdDateDescending = data.products.map(product => ({
      ...product,
      createdAt: new Date(product.createdAt)
    })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    latestProducts = createdDateDescending.slice(0, 8)
  }

  return (
    <>
      <BackToTop />
      <div className='px-4 md:px-0'>
        <Meta />
        <section className="banner">
          <div className="mx-auto max-w-screen-xl px-4 py-48 my-4 lg:flex w-full lg:items-center bg-[url('/images/banner_pics.png')] bg-cover bg-center md:bg-contain md:bg-no-repeat">
            <div className="mx-auto max-w-xl text-center bg-white/80 px-2 py-4 rounded-md">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                  Master Your Kettlebell Flow.
                <strong className="font-extrabold text-orange-700 sm:block"> Elevate Your Results. </strong>
              </h1>
              <p className="mt-4 sm:text-xl/relaxed">
              Perfect kettlebell technique unlocks maximum strength. Elevate fitness results with flawless flow and expert precision.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  className="block w-full rounded bg-orange-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-700 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto"
                  to='/shop'
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ProductCarousel />
        
        <section className="features">
          <div className="container px-6 py-20 mt-12 mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className='text-center'>
                <IconContext.Provider value={ {size: '2em'} }>
                  <ImPower className='mx-auto'/>
                </IconContext.Provider>
                <h1 className="mt-4 text-xl font-semibold text-gray-800">Versatile Training</h1>
                <p className="mt-2 text-gray-500">A kettlebell provides a diverse array of exercises, ensuring a comprehensive full-body workout experience. From swings to squats, it enables users to target various muscle groups, promoting strength, endurance, and flexibility.</p>
              </div>

              <div className='text-center'>
                <img 
                  src='/images/kettlebell.svg'
                  className="w-auto h-10 mx-auto"
                  alt="kettlebell"
                />
                <h1 className="mt-4 text-xl font-semibold text-gray-800">Compact and Portable</h1>
                <p className="mt-2 text-gray-500">Its compact design makes it an ideal addition to any home gym setup or for individuals with limited space. Additionally, its portability allows for convenient transportation, ensuring workouts can be completed wherever and whenever it&apos;s most convenient.</p>
              </div>

              <div className='text-center'>
                <svg className="w-10 h-10 mx-auto" viewBox="0 0 30 30" fill="none">
                    <g clipPath="url(#clip0)"><path d="M26.599 4.339a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM7.151 25.661a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM23.486 13.163a8.636 8.636 0 00-1.19-2.873l1.123-1.123-2.592-2.59L19.705 7.7a8.636 8.636 0 00-2.873-1.19V4.921h-3.664v1.586a8.634 8.634 0 00-2.873 1.19l-1.122-1.12-2.592 2.589 1.123 1.123a8.636 8.636 0 00-1.19 2.873H4.922l-.002 3.663h1.592A8.626 8.626 0 007.704 19.7l-1.127 1.127 2.59 2.591 1.128-1.127a8.623 8.623 0 002.873 1.19v1.597h3.664v-1.597a8.628 8.628 0 002.873-1.19l1.128 1.128 2.59-2.592-1.127-1.127a8.627 8.627 0 001.19-2.873h1.593v-3.664h-1.593zM15 19.256a4.255 4.255 0 110-8.511 4.255 4.255 0 010 8.51z" fill="#4299E1"/><path d="M5.276 23.2c-.42 0-.823.105-1.182.302A13.853 13.853 0 011.172 15C1.172 7.375 7.375 1.172 15 1.172c.927 0 1.854.092 2.754.274a.586.586 0 00.232-1.149A15.111 15.111 0 0015 0C10.993 0 7.226 1.56 4.393 4.393A14.902 14.902 0 000 15c0 3.37 1.144 6.66 3.228 9.296-.268.4-.413.872-.413 1.365 0 .657.257 1.275.721 1.74a2.444 2.444 0 001.74.721c.658 0 1.276-.256 1.74-.721.465-.465.721-1.083.721-1.74s-.256-1.276-.72-1.74a2.445 2.445 0 00-1.74-.72zm.912 3.373a1.28 1.28 0 01-.912.377 1.28 1.28 0 01-.911-.377 1.28 1.28 0 01-.378-.912c0-.344.134-.668.378-.912a1.28 1.28 0 01.911-.377c.345 0 .668.134.912.378.243.243.377.567.377.911 0 .344-.134.668-.377.912zM26.772 5.703a2.465 2.465 0 00-.308-3.104 2.446 2.446 0 00-1.74-.721c-.658 0-1.276.256-1.74.72a2.445 2.445 0 00-.721 1.74c0 .658.256 1.276.72 1.741.465.465 1.083.72 1.74.72.42 0 .824-.104 1.183-.3A13.854 13.854 0 0128.828 15c0 7.625-6.203 13.828-13.828 13.828-.918 0-1.836-.09-2.728-.269a.586.586 0 00-.23 1.15c.968.193 1.963.291 2.958.291 4.007 0 7.773-1.56 10.607-4.393A14.902 14.902 0 0030 15c0-3.37-1.145-6.66-3.228-9.297zm-2.96-.452a1.28 1.28 0 01-.377-.912c0-.344.134-.668.377-.911a1.28 1.28 0 01.912-.378 1.29 1.29 0 010 2.578 1.28 1.28 0 01-.912-.377z" fill="#2D3748"/><path d="M12.582 25.078c0 .324.263.586.586.586h3.664a.586.586 0 00.586-.586v-1.136a9.179 9.179 0 002.199-.911l.802.802a.586.586 0 00.829 0l2.59-2.592a.586.586 0 000-.828l-.802-.802a9.169 9.169 0 00.911-2.199h1.132a.586.586 0 00.586-.585v-3.664a.586.586 0 00-.586-.586h-1.132a9.17 9.17 0 00-.911-2.199l.797-.797a.587.587 0 000-.829l-2.592-2.59a.586.586 0 00-.829 0l-.795.797a9.177 9.177 0 00-2.2-.912V4.922a.586.586 0 00-.585-.586h-3.664a.586.586 0 00-.586.586v1.126a9.169 9.169 0 00-2.199.91l-.796-.795a.586.586 0 00-.828 0l-2.592 2.59a.585.585 0 000 .828l.797.797a9.173 9.173 0 00-.911 2.199h-1.13a.586.586 0 00-.586.585l-.002 3.664a.585.585 0 00.586.586h1.132c.207.77.512 1.507.911 2.2l-.801.8a.586.586 0 000 .83l2.59 2.59a.586.586 0 00.829 0l.801-.801a9.185 9.185 0 002.2.911v1.136zm-1.97-3.28a.586.586 0 00-.732.078l-.713.714-1.761-1.763.712-.713a.586.586 0 00.078-.732 8.02 8.02 0 01-1.11-2.679.586.586 0 00-.572-.462H5.507l.002-2.492h1.005a.586.586 0 00.572-.463 8.022 8.022 0 011.11-2.678.586.586 0 00-.078-.733l-.708-.708 1.763-1.761.707.707c.196.196.5.228.733.078a8.016 8.016 0 012.678-1.11.586.586 0 00.463-.573v-1h2.492v1c0 .277.193.515.463.573a8.024 8.024 0 012.678 1.11c.232.15.537.118.732-.078l.708-.707 1.762 1.761-.708.708a.586.586 0 00-.078.732 8.027 8.027 0 011.11 2.679c.058.27.297.463.573.463h1.007v2.492h-1.007a.586.586 0 00-.573.462 8.02 8.02 0 01-1.11 2.679.586.586 0 00.078.732l.713.713-1.761 1.762-.714-.713a.586.586 0 00-.732-.078 8.027 8.027 0 01-2.678 1.11.586.586 0 00-.463.573v1.011h-2.492v-1.01a.586.586 0 00-.463-.574 8.021 8.021 0 01-2.678-1.11z" fill="#2D3748"/><path d="M19.841 15A4.847 4.847 0 0015 10.158 4.847 4.847 0 0010.158 15 4.847 4.847 0 0015 19.841 4.847 4.847 0 0019.841 15zm-8.51 0A3.674 3.674 0 0115 11.33 3.674 3.674 0 0118.67 15 3.674 3.674 0 0115 18.67 3.674 3.674 0 0111.33 15z" fill="#2D3748"/><path d="M20.395 2.216a.59.59 0 00.415-.172.593.593 0 00.171-.415.59.59 0 00-.586-.586.589.589 0 00-.586.586.589.589 0 00.586.587zM9.63 27.794a.59.59 0 00-.586.586.59.59 0 00.586.586.59.59 0 00.586-.586.59.59 0 00-.586-.585z" fill="#4299E1"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h30v30H0z"/></clipPath></defs>
                </svg>
                  <h1 className="mt-4 text-xl font-semibold text-gray-800">Improves Grip Strength and Stability</h1>
                  <p className="mt-2 text-gray-500">With its distinctive thick handle, the kettlebell challenges and enhances grip strength and stability. This feature not only aids in maintaining control during exercises but also contributes to overall wrist stability and muscle engagement, resulting in more effective workouts.</p>
              </div>
            </div>
          </div>
        </section>

        { isLoading ? (
          <Loader customClass='min-h-screen'/>
        ) : error ? (
          errorMessage(error)
        ) : (
          <section id='latestProducts'>
            <span className="flex items-center">
              <span className="h-px flex-1 bg-gray-600"></span>
                <span className="shrink-0 px-6">
                  <h1 className="text-4xl font-bold my-8 mt-6 italic text-center">Latest Products</h1>
                </span>
              <span className="h-px flex-1 bg-gray-600"></span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              { latestProducts?.map((product) => (
                <div key={ product._id }>
                  <Product product={ product } />
                </div>
              )) }
            </div>
          </section>
        )}

        <section className="call-to-action my-20">
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-70"></div>
          </span>
          <div className="container flex flex-col items-center px-4 py-14 mx-auto text-center">
              <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight xl:text-3xl text-gray-800">
                Unlock Your Fitness Potential to the <span className="text-blue-500">next level.</span>
              </h2>
              <p className="max-w-4xl mt-6 text-center text-gray-800">
                Join our kettlebell community and take your workouts to the next level. Sign up now to access exclusive content, expert tips, and special offers tailored to your fitness goals. Don&apos;t miss out - start your kettlebell journey with us!
              </p>
              <div className="inline-flex w-full mt-6 sm:w-auto">
                <Link
                  className="inline-flex items-center justify-center w-auto mx-auto px-6 py-2 text-white duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  to='/register'
                >
                  Sign Up
                </Link>
              </div>
          </div>
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-70"></div>
          </span>
        </section>
      </div>
    </>
  )
};

export default HomeScreen;
