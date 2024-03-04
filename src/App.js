import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LogIn from "./pages/LogIn.jsx";
import Register from "./pages/Register.jsx";
import RegisterVehicle from "./pages/RegisterVehicle.jsx";
import RegisterParking from "./pages/RegisterParking.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <LogIn /> },
  { path: "/register", element: <Register /> },
  { path: "/register/vehicle", element: <RegisterVehicle /> },
  { path: "/register/parking", element: <RegisterParking /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
