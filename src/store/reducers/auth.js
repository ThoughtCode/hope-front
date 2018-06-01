import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  profile: null,
  error: null,
};

const authStart = (state, action) => updateObject(state, { error: null });

const authSuccess = (state, action) => updateObject(state, {
  token: action.token,
  userId: action.userId,
  profile: action.profile,
  error: null,
});

const authFail = (state, action) => updateObject(state, {
  error: null,
});

const authLogout = (state, action) => updateObject(state, { token: null, userId: null });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
};

export default reducer;
