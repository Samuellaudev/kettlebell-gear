import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks'

import { useGoogleOauthCallbackMutation } from '../../slices/googleApiSlice'
import { setCredentials } from '../../slices/authSlice';
import { isFetchBaseQueryError, isErrorWithMessage  } from '../../utils/helpers';

const AuthGoogleScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code') || '';

  const [getUser] = useGoogleOauthCallbackMutation()

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadOauthCallback = async () => {
      try {
        const res = await getUser({ code }).unwrap()

        dispatch(setCredentials({ ...res }));
        navigate('/welcome')
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          // Access all properties of `FetchBaseQueryError` here
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
          console.error(errMsg)
        } else if (isErrorWithMessage(err)) {
          // Access a string 'message' property here
          console.error(err.message)
        }
      }
    }
    
    loadOauthCallback()
  }, [])

  return null
}

export default AuthGoogleScreen