import { Link } from 'react-router-dom';

interface Path {
  title: string;
  link: string;
}

interface BreadcrumbProps {
  paths: Path[];
}

const Breadcrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex space-x-2 mt-10 pl-4">
        {paths.map((path, index) => (
          <li key={ index } className={ `breadcrumb-item${ index === paths.length - 1 ? ' active' : '' }` }>
            {/* Render the last item as plain text (not a link) */}
            {index === paths.length - 1 ? (
              <span className='text-blue-400 hover:underline'>{path.title}</span>
            ) : (
                // Render a link for non-last breadcrumb items
                <div className='flex items-center'>
                  <Link to={ path.link }>
                  <span className=" text-gray-400  rtl:-scale-x-100">
                      { path.title }</span>
                  </Link>
                  <span className="mx-5 ">
                    <img 
                      src='/svg/breadcrumb/right_arrow.svg'
                      className="my-auto w-auto h-5 opacity-50"
                    />
                  </span>
                </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;