
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Menu from './components/menu/Menu'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OrderFood from './components/orderFood/OrderFood'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import Dashboard from './components/dashboard/Dashboard'
import Cart from './components/dashboard/Cart'
import PrivateRouter from './components/authentication/PrivateRouter'
import UserHome from './components/dashboard/UserHome'
import MyBooking from './components/dashboard/MyBooking'
import AddReview from './components/dashboard/AddReview'
import Reservation from './components/dashboard/Reservation'
import AdminHome from './components/dashboard/admin/AdminHome'
import AllUsers from './components/dashboard/admin/AllUsers'
import AddItems from './components/dashboard/admin/AddItems'
import ManageItems from './components/dashboard/admin/ManageItems'
import ManageBookings from './components/dashboard/admin/ManageBookings'
import Item from './components/dashboard/admin/Item'
import Payment from './components/dashboard/payment/Payment'
import AdminRouter from './components/dashboard/admin/AdminRouter'


function App() {
  const location = useLocation();
  const noNavFooter = location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname.includes('dashboard')

  return (
    <div className='max-w-screen-xl mx-auto'>
      {noNavFooter || <Navbar></Navbar>}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/menu' element={<Menu></Menu>}></Route>
        <Route path='/order-food/:category' element={<OrderFood></OrderFood>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/dashboard' element={<PrivateRouter><Dashboard></Dashboard></PrivateRouter>}>

          <Route path='adminHome' element={<AdminRouter><AdminHome></AdminHome></AdminRouter>}></Route>
          <Route path='allusers' element={<AdminRouter><AllUsers></AllUsers></AdminRouter>}></Route>
          <Route path='additem' element={<AdminRouter><AddItems></AddItems></AdminRouter>}></Route>
          <Route path='manageitem' element={<AdminRouter><ManageItems></ManageItems></AdminRouter>}></Route>
          <Route path='manageitem/:id' element={<AdminRouter><Item></Item></AdminRouter>}></Route>
          <Route path='managebooking' element={<AdminRouter><ManageBookings></ManageBookings></AdminRouter>}></Route>

          <Route path='userHome' element={<UserHome></UserHome>}></Route>
          <Route path='cart' element={<Cart></Cart>}></Route>
          <Route path='payment' element={<Payment></Payment>}></Route>
          <Route path='booking' element={<MyBooking></MyBooking>}></Route>
          <Route path='review' element={<AddReview></AddReview>}></Route>
          <Route path='reservation' element={<Reservation></Reservation>}></Route>
        </Route>
      </Routes>
      {noNavFooter || <Footer></Footer>}
    </div>
  )
}

export default App
