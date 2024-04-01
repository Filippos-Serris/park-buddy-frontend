import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import LogIn from "./pages/LogIn.jsx";
import RegisterUser from "./pages/RegisterUser.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RegisterVehicle from "./pages/RegisterVehicle.jsx";
import RegisterParking from "./pages/RegisterParking.jsx";
import SearchParking from "./pages/SearchParking.jsx";
import { UserProvider } from "./store/user-context";
import LogOut from "./pages/LogOut.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <LogIn /> },
  { path: "/register", element: <RegisterUser /> },
  {
    path: "/",
    element: <LogOut />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/add-vehicle", element: <RegisterVehicle /> },
      { path: "/add-parking", element: <RegisterParking /> },
      { path: "/search-parking", element: <SearchParking /> },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
