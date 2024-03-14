import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../store/user-context";

const Register = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const { setRole } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    try {
      const logInUser = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };

      async function fetchUser() {
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
        const token = resData.token;
        localStorage.setItem("token", token);

        setRole(resData.role);
        navigate("/dashboard");
      }
      fetchUser();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }, [triggerSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerSubmit(!triggerSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
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

export default Register;
