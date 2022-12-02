import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {

    const { isAuthenticated } = useSelector(state => state.auth);
    
    if (isAuthenticated){
        return children;
    } else {
        return  <Navigate to="/login" />;
    }
}