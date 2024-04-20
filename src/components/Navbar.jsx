import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./authentication/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../utils/useCart";
import useAdmin from "../utils/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin() || false;
    const handleLogOut = () => {
        logOut()
            .then(() => {
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown  ">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm bg-black dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">

                        {
                            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                        }
                        {
                            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                        }
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/menu'>Our Menu</Link></li>
                        <li><Link to='/order-food/salad'>Order food</Link></li>
                        {
                            user && !isAdmin && <li><Link to='/dashboard/cart'><button className="btn">

                                <FaCartShopping />
                                <div className="badge badge-secondary">{cart.length}</div>
                            </button></Link></li>
                        }
                        {
                            user ? <><li><p>{user?.displayName}</p></li> <li><button onClick={handleLogOut} className="btn btn-ghost">Log Out</button></li></> : <li><Link to='/login'>Log In</Link></li>
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">Bistro Boss</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                    }
                    {
                        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                    }

                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/menu'>Our Menu</Link></li>
                    <li><Link to='/order-food/Salad'>Order food</Link></li>

                    {
                        user && !isAdmin && <li><Link to='/dashboard/cart'><button className="btn">

                            <FaCartShopping />
                            <div className="badge badge-secondary">{cart.length}</div>
                        </button></Link></li>
                    }
                    {
                        user ? <><li><p>{user?.displayName}</p></li> <li><button onClick={handleLogOut} className="btn btn-ghost">Log Out</button></li></> : <li><Link to='/login'>Log In</Link></li>
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;