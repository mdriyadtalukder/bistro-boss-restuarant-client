import { FaAd, FaHome, FaSearch } from "react-icons/fa";
import { FaBook, FaCalendar, FaCartShopping, FaList, FaUsers, FaUtensils } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../utils/useCart";
import useAdmin from "../../utils/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/adminHome'><FaHome></FaHome>Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/additem'><FaUtensils></FaUtensils>Add Items</NavLink></li>
                            <li><NavLink to='/dashboard/manageitem'><FaList></FaList>Manage Item</NavLink></li>
                            <li><NavLink to='/dashboard/managebooking'><FaBook></FaBook>Manage Bookings</NavLink></li>
                            <li><NavLink to='/dashboard/allusers'><FaUsers></FaUsers>All Users</NavLink></li>
                        </> : <><li><NavLink to='/dashboard/userHome'><FaHome></FaHome>User Home</NavLink></li>
                            <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar>Reservation</NavLink></li>
                            <li><NavLink to='/dashboard/cart'><FaCartShopping></FaCartShopping> My Cart ({cart?.length})</NavLink></li>
                            <li><NavLink to='/dashboard/review'><FaAd></FaAd>Add review</NavLink></li>
                            <li><NavLink to='/dashboard/booking'><FaList></FaList> My booking</NavLink></li></>
                    }

                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to='/order-food/Salad'><FaSearch></FaSearch>Menu</NavLink></li>

                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;