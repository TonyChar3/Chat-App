import {Navigate} from 'react-router-dom';
import { UserAuth } from './AuthContext'

const ProtectedRoutes = ({ children }) => {

    // current user from Context
    const {user} = UserAuth();

    // if there isn't a logged in user
    if(!user || user === null){
        // Navigate back to the Sign In form page
        return <Navigate to="/"/>
    }
    return children
}

export default ProtectedRoutes;