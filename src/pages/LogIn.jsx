import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/styles/pages/Login.css";

const Register = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();

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

    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logInUser),
        });
        if (!res.ok) {
          const errorData = await res.json();
          setError(`Error: ${errorData.error}`);
        }

        const resData = await res.json();
        const token = resData.token;
        localStorage.setItem("token", token);

        const role = resData.role;
        localStorage.setItem("role", role);

        navigate("/dashboard");
      } catch (error) {
        setShowError(true);
      }
    }
    fetchUser();
  }, [triggerSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerSubmit(!triggerSubmit);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {showError && <p className="error-message">{error}</p>}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          ref={usernameRef}
          placeholder="type your username"
          required
          minLength="4"
          maxLength="10"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          autoComplete="on"
          placeholder="type your password"
          required
          minLength="8"
          maxLength="10"
        />

        <button>LOGIN</button>

        <p>Or Sing up Using</p>
        <Link to="/register">Sign Up</Link>
      </form>
    </div>
  );
};

export default Register;
