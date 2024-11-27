import jwtDecode from 'jwt-decode';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (access) => {
  if (!access) {
    return false;
  }
  const decoded = jwtDecode(access);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

 const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  console.log(timeLeft);
  expiredTimer = window.setTimeout(() => {
    console.log('expired');
    // You can do what ever you want here, like show a notification
  }, timeLeft);
};

const setSession = (access) => {
  if (access) {
    localStorage.setItem('access', access);
    axios.defaults.headers.common.Authorization = `Bearer ${access}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode(access);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('access');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };

/* eslint-disable no-bitwise */
