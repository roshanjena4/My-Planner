import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const isAdmin = user?.role === 'admin';
  return isLoggedIn && isAdmin ? children : <Navigate to="/" />;
}
