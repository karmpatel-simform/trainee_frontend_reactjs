import { useNavigate } from 'react-router-dom';
import { authService } from './authService';

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  if (!authService.isAuthenticated()) {
    navigate('/login');
  }

  return element;
};

export default PrivateRoute;
