import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks'

import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import FormInput from '../../components/Form/FormInput';
import Modal from '../../components/Modal';
import GoogleButton from '../../components/Utility/GoogleButton';
import { initialDialogValue } from '../../utils/constants'
import { isFetchBaseQueryError, isErrorWithMessage } from '../../utils/helpers';

import { useRegisterMutation } from '../../slices/usersApiSlice';
import { useGetGoogleOauthUrlQuery } from '../../slices/googleApiSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<{ 
    title: string; 
    body?: string; 
    yesButtonText: string; 
    handleYesClick: () => void; 
  }>(initialDialogValue);
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const [register, { isLoading }] = useRegisterMutation();
  
  const { data: googleOauth, isLoading: loadingGoogleOauth, error } = useGetGoogleOauthUrlQuery()

  useEffect(() => {
    if (userInfo && userInfo.isVerified) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);  

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false)
    navigate('/')
  };

  const askForEmailVerification = () => {
    setDialog({
      title: 'Please verify your email address',
      body: 'A verification email has been sent to the email address you provided. Please verify your email to unlock full site features.',
      handleYesClick: closeModal,
      yesButtonText: 'Ok'
    })
    openModal()
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return
    }

    try {
      const res = await register({ name, email, password }).unwrap();

      askForEmailVerification()
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

  const handleGoogleLogin = () => {
    const width = 520;
    const height = 640;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const windowFeatures = `left=${ left },top=${ top },width=${ width },height=${ height }`;
    
    const popup = window.open(googleOauth?.url!, 'popup', windowFeatures);
    const checkPopupInterval = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(checkPopupInterval);
        return;
      }
  
      try {
        if (popup.location.href.includes('/welcome')) {
          popup.close();
          navigate('/shop');
          clearInterval(checkPopupInterval);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  }

  return (
    <FormContainer>
      <Modal
        isOpen={ isOpen }
        openModal={openModal}
        closeModal={ closeModal }
        dialog={ dialog }
      />
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600">Register</h3>
          <p className="mt-1 text-center text-gray-500 ">Create account</p>
          
          { isLoading ? (
            <Loader customClass='p-10 my-4'/>
          ) : (
          <form onSubmit={ submitHandler }>
            <div className="w-full mt-4">
              <FormInput
                id="name"
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ariaLabel="Name"
                required={true}
              />
            </div>

            <div className="w-full mt-4">
              <FormInput
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ariaLabel="Email Address"
                required={true}
              />
            </div>

            <div className="w-full mt-4">
              <FormInput
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ariaLabel="Password"
                required={true}
              />
            </div>

            <div className="w-full mt-4">
              <FormInput
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                ariaLabel="Password"
                required={true}
              />
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                  Register
              </button>
              <GoogleButton
                disabled={ !googleOauth?.url }
                handleGoogleLogin={ handleGoogleLogin }
                buttonType='Continue with Google'
              />
            </div>
          </form>
          )}
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50">
          <span className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link
              className='mx-2 text-sm font-bold text-blue-500 hover:underline'
              to={ redirect ? `/login?redirect=${ redirect }` : '/login' }
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
