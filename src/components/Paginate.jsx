import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className="mt-6">
        <ul className="pagination flex items-center justify-center">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={ !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${ x + 1 }` }
                className={`${
                  x + 1 === page ? "bg-blue-500 text-white" : "text-blue-500"
                } px-3 py-1  rounded-md hover:bg-blue-400 hover:text-white`}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Paginate;
