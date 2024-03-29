interface FormContainerProps {
  children: JSX.Element | JSX.Element[];
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div className='relative container mx-auto my-14'>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
