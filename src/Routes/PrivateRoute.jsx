
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { isLoggedIn } = useSelector(state => state.userAuth);
    if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

