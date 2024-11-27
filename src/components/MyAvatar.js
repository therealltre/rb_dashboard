// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.profile?.imageUrl}
      alt={user?.profile?.first_name}
      color={user?.profile?.imageUrl ? 'default' : createAvatar(user?.profile?.first_name).color}
      {...other}
    >
      {createAvatar(user?.profile?.first_name).name}
    </Avatar>
  );
}
