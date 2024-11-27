// routes
import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';

import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'About Us',
    icon: <Iconify icon={'material-symbols:note-outline'} {...ICON_SIZE} />,
    path: PATH_PAGE.about,
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon={'pixelarticons:contact-plus'} {...ICON_SIZE} />,
    path: PATH_PAGE.contact,
  },

  {
    title: 'Login',
    icon: <Iconify icon={'ic:round-login'} {...ICON_SIZE} />,
    path: PATH_AUTH.login,
  },
];

export default menuConfig;
