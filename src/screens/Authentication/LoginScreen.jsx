import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import FormInput from '../../components/Form/FormInput';

import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login, { isLoading }] = useLoginMutation();
  
  const { userInfo } = useSelector((state) => state.auth);
  
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';
  
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600">Welcome Back</h3>
          <p className="mt-1 text-center text-gray-500 ">Login or create account</p>
            
          { isLoading ? (
            <Loader customClass='p-10 my-4'/>
          ) : (
          <form onSubmit={ submitHandler }>
            <div className="w-full mt-4">
              <FormInput
                id="email"
                type="email"
                placeholder="Enter email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                ariaLabel="Email Address"
                required={ true }
              />
            </div>

            <div className="w-full mt-4">
              <FormInput
                id="password"
                type="password"
                placeholder="Enter password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                ariaLabel="Password"
                required={ true }
              />
            </div>

            <div className="flex items-center justify-center mt-4">
              {/* To be done: forget password */}
              <button
                type="submit"
                disabled={ isLoading }
                className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>
          ) }
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50">
          <span className='text-sm text-gray-600'>
            New Customer?{ ' ' }
            <Link
              className='mx-2 text-sm font-bold text-blue-500 hover:underline'
              to={ redirect ? `/register?redirect=${ redirect }` : '/register' }
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
