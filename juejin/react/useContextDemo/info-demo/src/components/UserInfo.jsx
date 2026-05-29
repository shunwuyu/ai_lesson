import {
  useContext
} from 'react';
import {
  UserContext
} from '../App';

const UserInfo = () => {
  const user = useContext(UserContext);
  return (
    <div>{user.name}</div>
  )
}

export default UserInfo