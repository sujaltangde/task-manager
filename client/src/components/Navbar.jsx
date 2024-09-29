import { useCallback, useEffect, useMemo, useState } from "react";
import { PiNotepadFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { verify } from "../actions/userActions";
import { logout } from "../slices/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    // Memoize the pathName for optimization
    const pathName = useMemo(() => location.pathname, [location.pathname]);

    // Set the initial button state based on the pathName
    const initialBtnState = useMemo(() => {
        if (pathName === '/login') return 'login';
        if (pathName === '/signup') return 'signup';
        return '';
    }, [pathName]);

    const [btnState, setBtnState] = useState(initialBtnState);


    const handleLogout = useCallback(() => {
        localStorage.clear();
        dispatch(verify());
        dispatch(logout())
        toast.success("Logout Successful!");
    }, [dispatch]);


    useEffect(() => {
        setBtnState(initialBtnState);
    }, [initialBtnState]);


    return (
        <>
            <div className="bg-blue-600 fixed w-full">
                <div className="flex justify-between sm:px-8 px-3 py-3">
                    <div>
                        <Link to="/"><PiNotepadFill className="text-white" size={30} /></Link>
                    </div>

                    <div className="flex items-center gap-5">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-12">
                                <Link to='/profile' className="w-8 h-8">
                                    {user && <img src={user.avatar} className="w-full h-full object-cover  rounded-full" alt="img" />}
                                </Link>
                                <button onClick={handleLogout} className="px-4 py-1 bg-red-600 text-white font-semibold rounded-sm">Logout</button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className={`font-semibold ${btnState === 'login' ? 'text-blue-600 bg-white rounded-sm py-1 px-4' : 'text-white py-1 px-4'}`}>Login</Link>
                                <Link to="/signup" className={`font-semibold ${btnState === 'signup' ? 'text-blue-600 bg-white rounded-sm py-1 px-4' : 'text-white py-1 px-4'}`}>Signup</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
