// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  dashboard: getIcon('ic_dashboard'),
  statistics: getIcon('ic_statistics'),
  customers: getIcon('ic_customers'),
  products: getIcon('ic_products'),
  messages: getIcon('ic_messages'),
  wallet: getIcon('ic_wallet'),
  settings: getIcon('ic_settings'),
  security: getIcon('ic_security'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'menu',
    items: [
      { title: 'Overview', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'Statistics', path: PATH_DASHBOARD.general.statistics, icon: ICONS.statistics },
      { title: 'Customers', path: PATH_DASHBOARD.general.customers, icon: ICONS.customers },
      { title: 'Products', path: PATH_DASHBOARD.general.products, icon: ICONS.products },
      { title: 'Messages', path: PATH_DASHBOARD.general.messages, icon: ICONS.messages },
      { title: 'Wallet', path: PATH_DASHBOARD.general.wallet, icon: ICONS.wallet },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
    
      {
        title: 'settings',
        path: PATH_DASHBOARD.settings.app,
        icon: ICONS.settings,
      },

     
      {
        title: 'security',
        path: PATH_DASHBOARD.security.app,
        icon: ICONS.security,
      },
    ],
  },
];

export default navConfig;
