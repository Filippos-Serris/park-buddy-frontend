import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };
  return (
    <Fragment>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Logout;
