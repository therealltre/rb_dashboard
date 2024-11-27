// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

//dashboard-----------------------------------------------------
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    statistics: path(ROOTS_DASHBOARD, '#'),
    customers: path(ROOTS_DASHBOARD, '/#'),
    products: path(ROOTS_DASHBOARD, '/#'),
    messages: path(ROOTS_DASHBOARD, '/#'),
    wallet: path(ROOTS_DASHBOARD, '/#'),
  },

  settings: {
    root: path(ROOTS_DASHBOARD, '/#'),
    app: path(ROOTS_DASHBOARD, '/#/'),
  },

  security: {
    root: path(ROOTS_DASHBOARD, '/#'),
    app: path(ROOTS_DASHBOARD, '/#'),
  },
};
