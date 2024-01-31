import { ImSpinner11 } from "react-icons/im";
import { IconContext } from "react-icons";

const Loader = ({customClass}) => {
  const options = {
    color: "gray",
    size: '2rem',
    className: `global-class-name ${customClass}`
  }

  return (
    <IconContext.Provider value={ options }>
      <div className="flex justify-center items-center h-full">
        <ImSpinner11 className="animate-spin"/>
      </div>
    </IconContext.Provider>
  );
};

export default Loader;
