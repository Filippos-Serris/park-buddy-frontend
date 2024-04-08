import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/pages/common/RegisterUser.css";

const Register = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();

  const [matchingPasswords, setMatchingPasswords] = useState(true);
  const [roleError, setRoleError] = useState(false);

  const navigate = useNavigate();

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const repeatPasswordRef = useRef("");
  const contactInfoRef = useRef("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    const userData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      contactInfo: contactInfoRef.current.value,
      role: role,
    };

    async function postUser() {
      try {
        const res = await fetch("http://localhost:8080/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (!res.ok) {
          console.log(res.status);
          const errorData = await res.json();
          setError(`Error: ${errorData.error}`);
        } else {
          navigate("/login");
        }
      } catch (error) {
        setShowError(true);
      }
    }
    postUser();
  }, [triggerSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerSubmit(!triggerSubmit);

    /* const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (password === repeatPassword) {
      setMatchingPasswords(true);
    } else setMatchingPasswords(false);

    if (role === null) {
      setRoleError(true);
    } else setRoleError(false);

    if (password === repeatPassword && role !== null)
      setTriggerSubmit(!triggerSubmit); */
  };

  const roleChangeHandler = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="registration-form-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <p>
          Either you are searching for a spot to put you precious car or a way
          to expand your bushiness we have you. <br />
          Register below and lets get it started
        </p>

        <div className="name">
          <label>Name</label>
          <div className="name-container">
            <input
              type="text"
              ref={firstNameRef}
              placeholder="First name"
              required
              minLength="4"
              maxLength="10"
            />

            <input
              type="text"
              id="lastName"
              ref={lastNameRef}
              placeholder="Last name"
              required
              minLength="4"
              maxLength="10"
            />
          </div>
        </div>

        <div className="field-containers">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            required
            minLength="4"
            maxLength="10"
          ></input>
        </div>

        <div className="field-containers">
          <label htmlFor="email">e-mail</label>
          <input type="email" id="email" ref={emailRef} required></input>
        </div>

        <div className="password">
          <label>Password</label>
          <div className="password-container">
            <input
              type="password"
              id="password"
              ref={passwordRef}
              autoComplete="on"
              placeholder="Password"
              required
              minLength="8"
              maxLength="10"
            />

            <input
              type="password"
              id="repeat-password"
              ref={repeatPasswordRef}
              autoComplete="on"
              placeholder="Repeat password"
              required
              minLength="8"
              maxLength="10"
            />

            {!matchingPasswords && <p>passwords not matching try again</p>}
          </div>
        </div>

        <div className="field-containers">
          <label htmlFor="contactInfo">Contact information</label>
          <input
            type="number"
            id="contactInfo"
            ref={contactInfoRef}
            required
          ></input>
        </div>

        <div>
          <label>Role</label>
          <input
            id="client"
            type="radio"
            name="role"
            value="client"
            onChange={roleChangeHandler}
          ></input>
          <label htmlFor="client">Client</label>
          <input
            id="owner"
            type="radio"
            name="role"
            value="owner"
            onChange={roleChangeHandler}
          ></input>
          <label htmlFor="owner">Owner</label>
          {roleError && <p>role selection is mandatory</p>}
        </div>

        {showError && <p className="error-message">{error}</p>}

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
