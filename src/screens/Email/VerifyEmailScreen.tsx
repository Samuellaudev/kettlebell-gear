import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../utils/helpers';
import { useVerifyEmailMutation } from '../../slices/emailsApiSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const VerifyEmailScreen = () => {
  const { verificationString = '' } = useParams<{ verificationString: string }>()
  const [isSuccess, setIsSuccess] = useState(false);

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  
  useEffect(() => {
    const loadVerification = async () => {

      try {
        const response = await verifyEmail({verificationString})

        if ('data' in response) {
          const { isVerified } = response.data
          isVerified ? setIsSuccess(true) : setIsSuccess(false)
        }
        
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          // Access all properties of `FetchBaseQueryError` here
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
          toast.error(errMsg)
        } else if (isErrorWithMessage(err)) {
          // Access a string 'message' property here
          toast.error(err.message)
        }
      }
    };

    loadVerification();
  }, [verificationString]);

  const SuccessContent = () => (
    <div className="container mx-auto text-black">
      <div className="flex flex-col items-center justify-center text-center mt-48 space-y-8 text-gray-600">
        <h2 className="text-4xl font-semibold">Success!</h2>
        <div className="w-[400px] md:w-auto leading-loose">
          <p>Thanks for verifying your email.</p>
          <p>Kindly log in to resume your shopping experience.</p>
        </div>
        <p className="border border-gray-300 rounded-md cursor-pointer px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          <Link to='/login'>Go to login</Link>
        </p>
      </div>
    </div>
  );

  const ErrorContent = () => (
    <div className="container mx-auto text-black">
      <div className="flex flex-col items-center justify-center text-center mt-48 space-y-8 text-gray-600">
        <h2 className="text-4xl font-semibold">Uh oh...</h2>
        <p className="w-[300px]">
          Something went wrong while trying to verify your email.
        </p>
        <p className="border border-gray-300 rounded-md cursor-pointer px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          <Link to="/register">Back to register</Link>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      { isLoading ? (
        <Loader customClass='min-h-screen my-4' />
      ) : isSuccess ? (
        <SuccessContent />
      ) : (
        <ErrorContent />
      )}
    </div>
  )
}

export default VerifyEmailScreen