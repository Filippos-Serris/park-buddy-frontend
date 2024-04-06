import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/common/Homepage.jsx";
import LogIn from "./pages/common/LogIn.jsx";
import RegisterUser from "./pages/common/RegisterUser.jsx";
import Dashboard from "./pages/common/Dashboard.jsx";
import RegisterVehicle from "./pages/client/RegisterVehicle.jsx";
import RegisterParking from "./pages/owner/RegisterParking.jsx";
import SearchParking from "./pages/client/SearchParking.jsx";
import Logout from "./pages/common/Logout.jsx";
import Parking from "./components/Client/Dashboard/SearchParking/Parking.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <LogIn /> },
  { path: "/register", element: <RegisterUser /> },
  {
    path: "/",
    element: <Logout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/add-vehicle", element: <RegisterVehicle /> },
      { path: "/add-parking", element: <RegisterParking /> },
      { path: "/search-parking", element: <SearchParking /> },
      { path: "/parking/:parkingId", element: <Parking /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
