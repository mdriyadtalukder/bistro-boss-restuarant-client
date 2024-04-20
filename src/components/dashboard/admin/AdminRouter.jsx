import { useContext } from 'react';
import { AuthContext } from '../../authentication/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../../utils/useAdmin';

const AdminRouter = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (user || isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace ></Navigate>

};

export default AdminRouter;