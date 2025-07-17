import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
    const { isLoggedIn } = useSelector(state => state.userAuth);
    debugger;
    return isLoggedIn ? <Navigate to="/task" replace /> : children
        //true = <Navigate to="/task" />  
}

