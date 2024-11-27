import { createContext, useEffect, useReducer } from 'react';
import axios from '../utils/axios';
import { isValidToken } from '../utils/jwt';
import PropTypes from 'prop-types';

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const setSession = (access) => {
  if (access) {
    localStorage.setItem('access', access);
    axios.defaults.headers.common.Authorization = `Bearer ${access}`;
  } else {
    localStorage.removeItem('access');
    delete axios.defaults.headers.common.Authorization;
  }
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export function AuthProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const access = localStorage.getItem('access');

        // if (accessToken && verify(accessToken, JWT_SECRET)) {
        if (access && isValidToken(access)) {
          setSession(access); 

          // Parse user data directly from localStorage or from initial login
          const user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          } else {
            throw new Error('User data not found in localStorage');
          }
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  //LOGIN ------------------------------------------------------------------------

  const login = async (email, password) => {
    const response = await axios.post('auth/login/', {
      email,
      password,
    });
    const { access, user, refresh } = response.data.data;

    console.log('user: ', user);

    setSession(access, refresh);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  //LOGOUT ------------------------------------------------------------------------

const logout = async (refresh) => {
  try {
    await axios.post('auth/logout', {
      refresh,
    });
    // Clear tokens and session
    localStorage.removeItem('access');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refresh');
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  } catch (error) {
    console.error('Error during logout:', error);
  }
};


  //REGISTER ------------------------------------------------------------------------

  const register = async (email, displayName, password) => {
    const response = await axios.post('/api/account/register', {
      email,
      displayName,
      password,
    });
    const { access, user } = response.data;

    window.localStorage.setItem('access', access);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
