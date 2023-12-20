import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/styles.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Main from "./layouts/Main";
import Login from "./components/LoginBooking";
import PrivateRoutes from "./layouts/PrivateRoutes";
import PublicRoutes from "./layouts/PublicRoutes";
import Register from "./components/RegisterBooking";
import Layout from "./layouts/Layout";
import UserUpdate from "./components/user/UserUpdate";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import RoomAdd from "./components/room/RoomAdd";
import BookingList from "./components/booking/BookingList";
import RoomList from "./components/room/RoomList";
import UserList from "./components/user/UserList";
import UserAdd from "./components/user/UserAdd";
import RoomUpdate from "./components/room/RoomUpdate";
import ReviewList from "./components/review/ReviewList";
import ListService from "./components/services/ListService";
import AddBooking from "./components/booking/AddBooking";
import AddService from "./components/services/AddService";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/add" element={<UserAdd />} />
            <Route path="/users/edit/:id" element={<UserUpdate />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/room" element={<RoomList />} />
            <Route path="/room/add" element={<RoomAdd />} />
            <Route path="/room/edit/:id" element={<RoomUpdate />} />
            <Route path="/booking" element={<BookingList />} />
            <Route path="/booking/add" element={<AddBooking />} />
            <Route path="/review" element={<ReviewList />} />
            <Route path="/service" element={<ListService />} />
            <Route path="/service/add" element={<AddService />} />
          </Route>
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
