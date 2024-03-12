import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import LogIn from "./pages/LogIn.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RegisterVehicle from "./pages/RegisterVehicle.jsx";
import RegisterParking from "./pages/RegisterParking.jsx";
import { UserProvider } from "./store/user-context";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <LogIn /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/add-vehicle", element: <RegisterVehicle /> },
  { path: "/add-parking", element: <RegisterParking /> },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
