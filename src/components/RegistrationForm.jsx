import React, { useEffect, useRef, useState } from "react";

const RegistrationForm = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [submit, setSubmit] = useState(true);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const contactInfoRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    try {
      if (firstLoad) {
        setFirstLoad(false);
        return;
      }
      const formData = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        contactInfo: contactInfoRef.current.value,
        role: "client",
      };
      async function fetchOwner() {
        const res = await fetch("http://localhost:8080/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const resData = await res.json();
        console.log(formData);
        console.log(resData);
      }
      fetchOwner();
    } catch (e) {
      console.log(e);
    }
  }, [submit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(!submit);
  };

  const roleChangeHandler = () => {
    const role = roleRef.current.value;
    console.log(role);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="name">
        <label htmlFor="firstName">First name</label>
        <input type="text" id="firstName" ref={firstNameRef}></input>

        <label htmlFor="lastName">Last name</label>
        <input type="text" id="lastName" ref={lastNameRef}></input>
      </div>

      <label htmlFor="username">Username</label>
      <input type="text" id="username" ref={usernameRef}></input>

      <label htmlFor="email">email</label>
      <input type="text" id="email" ref={emailRef}></input>

      <div className="password">
        <label htmlFor="password">Password</label>
        <input type="text" id="password" ref={passwordRef}></input>

        <label htmlFor="repeat-password">Repeat password</label>
        <input
          type="password"
          id="repeat-password"
          ref={repeatPasswordRef}
          autoComplete="on"
        ></input>
      </div>

      <label htmlFor="contactInfo">Contact information</label>
      <input type="text" id="contactInfo" ref={contactInfoRef}></input>

      <label htmlFor="role">Role</label>
      <select id="role" ref={roleRef} onChange={roleChangeHandler}>
        <option value="client">client</option>
        <option value="owner">owner</option>
      </select>

      <button>Submit</button>
    </form>
  );
};

export default RegistrationForm;
