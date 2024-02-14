import { ImSpinner11 } from "react-icons/im";
import { IconContext } from "react-icons";

interface LoaderProps {
  customClass: string;
}

const Loader = ({customClass}: LoaderProps) => {
  const options = {
    color: "gray",
    size: '2rem',
    className: `global-class-name`
  }

  return (
    <IconContext.Provider value={ options }>
      <div className={`${customClass} flex justify-center items-center opacity-50 w-full bg-gray-300/60 rounded-md`}>
        <ImSpinner11 className="animate-spin"/>
      </div>
    </IconContext.Provider>
  );
};

export default Loader;
