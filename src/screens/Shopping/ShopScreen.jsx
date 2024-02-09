import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Product from '../../components/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';
import Dropdown from '../../components/Dropdown';
import { productsByTimestamps } from '../../utils/helpers'

const ShopScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber
  });

  const [filteredProducts, setFilteredProducts] = useState([])
  const [inStock, setInStock] = useState(false)
  const [outOfStock, setOutOfStock] = useState(false)
  const [filterMinPrice, setFilterMinPrice] = useState(0)
  const [filterMaxPrice, setFilterMaxPrice] = useState(1000)

  useEffect(() => {
    if (!isLoading && data) {
      setFilteredProducts(data.products || []);
    }
  }, [data, isLoading]);

  const productOutOfStock = !isLoading && [...data.products].filter(item => item.countInStock === 0)
  const productInStock = !isLoading && [...data.products].filter(item => item.countInStock > 0)
  const countInStock = productOutOfStock.length
  const countOutOfStock = productInStock.length

  const handleInStockClick = () => {
    if (!inStock) {
      setInStock(true)

      outOfStock
        ? setFilteredProducts([...data.products])
        : setFilteredProducts(productInStock)
    } else {
      if (outOfStock) {
        setFilteredProducts(productOutOfStock)
        setInStock(false)
      } else {
        handleResetClick() 
      }
    }
  }
  const handleOutOfStockClick = () => {
    if (!outOfStock) {
      setOutOfStock(true)

      inStock
        ? setFilteredProducts([...data.products])
        : setFilteredProducts(productOutOfStock)
    } else {
      if (inStock) {
        setFilteredProducts(productInStock)
        setOutOfStock(false)
      } else {
        handleResetClick() 
      }
    }
  }

  useEffect(() => {
    handlePriceChange()
  }, [filterMinPrice, filterMaxPrice])

  const handleMinPriceChange = (e) => {
    const typedPrice = Number(e.target.value)

    if (typedPrice < 0) {
      setFilterMinPrice(0)
      return
    }

    setFilterMinPrice(typedPrice)
  }
  const handleMaxPriceChange = (e) => {
    const typedPrice = Number(e.target.value)

    if (typedPrice > 1000) {
      setFilterMaxPrice(1000)
      return
    }

    setFilterMaxPrice(typedPrice)
  }
  const handlePriceChange = () => {
    const result = data?.products.filter(product => product.price >= filterMinPrice && product.price <= filterMaxPrice);

    setFilteredProducts(result)
  }

  const handleResetClick = () => {
    setFilterMinPrice(0)
    setFilterMaxPrice(1000)
    setInStock(false)
    setOutOfStock(false)
    setFilteredProducts(data.products)
  }

  // Sort by - options
  const handlePriceAscClick = () => {
    const priceAscending = [...filteredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(priceAscending)
  }
  const handlePriceDescClick = () => {
    const priceDescending = [...filteredProducts].sort((a, b) => b.price - a.price);
    setFilteredProducts(priceDescending)
  }
  const handleCreateAscClick = () => {
    const createdDateAscending = productsByTimestamps(filteredProducts).sort((a, b) => a.createdAt - b.createdAt);
    setFilteredProducts(createdDateAscending)
  }
  const handleCreateDescClick = () => {
    const createdDateDescending = productsByTimestamps(filteredProducts).sort((a, b) => b.createdAt - a.createdAt);
    setFilteredProducts(createdDateDescending)
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between w-full bg-[url('/images/kettlebell_shop_banner.png')] bg-cover bg-center md:bg-cover md:bg-no-repeat">
        <h2 className="text-4xl font-bold p-16 text-gray-800 mx-auto text-center">Kettlebells</h2>
      </div>

      <div className='flex flex-col md:flex-row md:space-x-4 py-10'>

        {/* Left panel */ }
        <div className='w-full md:w-1/6 py-4 space-y-2'>
          {/* Option - Availability */}
          <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Availability </span>
              <span className="transition group-open:-rotate-180">
                <img 
                  src='/svg/menu/dropdown-menu_down-arrow.svg'
                  className="w-auto h-5 ml-1"
                  alt="dropdown menu"
                />
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      checked={inStock}
                      onChange={ handleInStockClick }
                      className="size-3 appearance-none checked:appearance-auto rounded-sm border border-slate-300 accent-blue-300 dark:accent-blue-400" 
                    />
                    <span className="text-sm font-medium text-gray-700"> In Stock ({countInStock}) </span>
                  </label>
                </li>

                <li>
                  <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterOutOfStock"
                      checked={outOfStock}
                      onChange={ handleOutOfStockClick }
                      className="size-3 appearance-none checked:appearance-auto rounded-sm border border-slate-300 accent-blue-300 dark:accent-blue-400" 
                    />
                    <span className="text-sm font-medium text-gray-700"> Out of Stock ({countOutOfStock}) </span>
                  </label>
                </li>
              </ul>
              <div className="flex items-center justify-end px-4 pb-4">
                <button
                  type="button"
                  onClick={handleResetClick}
                  className="text-sm text-gray-900 underline underline-offset-4">
                  Reset
                </button>
              </div>
            </div>
          </details>

          {/* Option - Price */}
          <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Price </span>
              <span className="transition group-open:-rotate-180">
                <img 
                  src='/svg/menu/dropdown-menu_down-arrow.svg'
                  className="w-auto h-4 ml-1"
                  alt="dropdown menu"
                />
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between gap-2">
                  <label htmlFor="FilterMinPrice" className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">£</span>
                    <input
                      type="number"
                      id="FilterMinPrice"
                      placeholder="From"
                      className="w-full rounded-md px-2 py-1 bg-white border border-gray-200 shadow-sm sm:text-sm"
                      min="0"
                      value={ filterMinPrice }
                      onChange={handleMinPriceChange}
                    />
                  </label>

                  <label htmlFor="FilterMaxPrice" className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">£</span>
                    <input
                      type="number"
                      id="FilterMaxPrice"
                      placeholder="To"
                      className="w-full rounded-md px-2 py-1 bg-white border border-gray-200 shadow-sm sm:text-sm"
                      max="1000"
                      value={ filterMaxPrice }
                      onChange={handleMaxPriceChange}
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end px-4 pb-4">
                <button
                  type="button"
                  onClick={handleResetClick}
                  className="text-sm text-gray-900 underline underline-offset-4">
                  Reset
                </button>
              </div>
            </div>
          </details>
        </div>

        {/* Right panel */ }
        { isLoading ? (
          <Loader customClass='min-h-screen' />
        ) : error ? (
          <Message variant='error'>{ error?.data.message || error?.error }</Message>
        ) : filteredProducts?.length === 0 ? (
          <div className='w-full md:w-5/6'>
            <Message variant="info">No products found.</Message>
          </div>
        ) : (
          <div className='right-panel md:w-5/6'>
            <div className='flex items-center justify-end'>
              <span className='font-semibold text-sm'>Sort by:</span>
                <Dropdown 
                  handleManualClick={handleResetClick}
                  handlePriceAscClick={handlePriceAscClick}
                  handlePriceDescClick={handlePriceDescClick}
                  handleCreateAscClick={handleCreateAscClick}
                  handleCreateDescClick={handleCreateDescClick}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              { filteredProducts?.map((product) => (
                <div key={ product._id }>
                  <Product product={ product } />
                </div>
              )) }
            </div>
            <Paginate
              pages={ data.pages }
              page={ data.page }
            />
          </div>
        ) }
      </div>
    </div>
  )
}

export default ShopScreen