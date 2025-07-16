import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
    const { isLoggedIn } = useSelector(state => state.userAuth);
    return isLoggedIn ?  <Navigate to="/task" />: children
}

