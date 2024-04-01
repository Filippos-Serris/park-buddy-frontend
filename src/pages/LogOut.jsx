import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const LogOut = () => {
  return (
    <Fragment>
      <div>
        <button>Logout</button>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default LogOut;
