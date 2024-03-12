import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../store/user-context";

const LogInForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [logIn, setLogIn] = useState(true);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    const logInUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    async function validateUser() {
      try {
        const res = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logInUser),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const resData = await res.json();

        console.log(resData);
        const token = resData.token;
        localStorage.setItem("token", token);
        setUser({ id: resData.id, role: resData.role });

        navigate("/dashboard");

        //console.log(resData);
      } catch (e) {
        console.log("Error:", e.message);
      }
    }
    validateUser();
  }, [logIn]);

  const logInHandler = (event) => {
    event.preventDefault();

    setLogIn(!logIn);
  };

  return (
    <form onSubmit={logInHandler}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" ref={usernameRef} />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        ref={passwordRef}
        autoComplete="on"
      />

      <button>Log in</button>
    </form>
  );
};

export default LogInForm;
