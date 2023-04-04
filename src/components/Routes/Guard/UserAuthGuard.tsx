
import { useSelector } from 'react-redux';
import {
  Navigate,
  Outlet
} from 'react-router-dom';
import {FC} from 'react';
// type IProps = {
//   children: React.FC;
//   redirectPath :string
// }

interface PropType{
  component: React.FC;
}
const UserAuthGuard: FC<PropType> = ({ component: Component }) => {
  const token = useSelector((state: any) => state.user.token); 
//  console.log('token', token)
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return <Component/>
  }
};

export default UserAuthGuard;