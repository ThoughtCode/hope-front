import { push } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch(authLogout());
  dispatch(push('/'));
};

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    customer: {
      email,
      password,
    },
  };
  axios.post('/customers/signin', authData)
    .then((response) => {
      const customer = response.data.customer.data;
      localStorage.setItem('token', customer.attributes.access_token);
      localStorage.setItem('userId', customer.id);
      localStorage.setItem('signInAs', 'customer');
      dispatch(authSuccess(customer.attributes.access_token, customer.id));
      // dispatch(push('/cliente/dashboard'));
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
};

export const facebookLogin = accessToken => (dispatch) => {
  dispatch(authStart());
  const facebookData = {
    customer: {
      facebook_access_token: accessToken,
    },
  };
  axios.post('/customers/facebook', facebookData)
    .then((response) => {
      const customer = response.data.customer.data;
      localStorage.setItem('token', customer.attributes.access_token);
      localStorage.setItem('userId', customer.id);
      localStorage.setItem('signInAs', 'customer');
      dispatch(authSuccess(customer.attributes.access_token, customer.id));
      dispatch(push('/cliente/dashboard'));
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const userId = localStorage.getItem('userId');
    dispatch(authSuccess(token, userId));
  }
};
