import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { loginAuth0 } from './redux/actions';
import { useHistory } from 'react-router-dom';
import BackdropLoader from '../../components/loader/BackdropLoader';

function Auth0Login() {
  const {
    isLoading: auth0Loading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently, ...rest
  } = useAuth0();

  const [hasDispatched, setHasDispatched] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();  
  const delayCallback = (callback, delay) => {
    setTimeout(callback, delay);
  };
  const dispactchLogin = async () => {
    if (hasDispatched) return; // Prevent multiple dispatches
    try {
      const token = await getAccessTokenSilently();
      localStorage.setItem('X-Custom-Auth', token);
      dispatch(loginAuth0(history, ()=>{
        delayCallback(rest.logout, 3000)
      }));
      setHasDispatched(true);
    } catch (err) {
      console.error('Error during token retrieval or dispatch:', err);
    }
  };

  // Automatic login trigger
  useEffect(() => {
    if (!isAuthenticated && !auth0Loading && !hasDispatched) {
  loginWithRedirect();
    }
  }, [isAuthenticated, auth0Loading, hasDispatched]);

  // Dispatch after authentication
  useEffect(() => {
    if (isAuthenticated && !hasDispatched) {
      dispactchLogin();
    }
  }, [isAuthenticated, hasDispatched]);

  return (
    <div>
     <BackdropLoader />
    </div>
  );
}

export default Auth0Login;
