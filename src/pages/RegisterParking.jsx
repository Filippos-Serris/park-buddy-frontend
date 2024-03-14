import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterParking = () => {
  const token = localStorage.getItem("token");

  const nameRef = useRef();
  const streetRef = useRef();
  const numberRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const vehicleSlotRef = useRef();
  const motoSlotRef = useRef();
  const hourlyChargeRef = useRef();
  const dailyChargeRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    try {
      const parkingData = {
        name: nameRef.current.value,
        location: {
          street: streetRef.current.value,
          number: numberRef.current.value,
          postal: postalRef.current.value,
          city: cityRef.current.value,
        },
        slots: {
          vehicle: vehicleSlotRef.current.value,
          moto: motoSlotRef.current.value,
        },
        pricing: {
          hourly: hourlyChargeRef.current.value,
          daily: dailyChargeRef.current.value,
        },
      };
      async function postParking() {
        const res = await fetch("http://localhost:8080/parking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(parkingData),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        if (res.status === 200) {
          navigate("/dashboard");
        }
      }
      postParking();
    } catch (error) {
      console.log(error.message);
    }
  }, [triggerSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerSubmit(!triggerSubmit);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        required
        minLength="5"
        maxLength="15"
        ref={nameRef}
      />

      <fieldset>
        <legend>Location</legend>

        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          required
          minLength="3"
          maxLength="15"
          ref={streetRef}
        />

        <label htmlFor="number">Number</label>
        <input
          type="number"
          id="number"
          required
          min="1"
          max="999"
          ref={numberRef}
        />

        <label htmlFor="postal">Postal code</label>
        <input
          type="text"
          id="postal"
          required
          minLength="5"
          maxLength="5"
          ref={postalRef}
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          required
          minLength="5"
          maxLength="10"
          ref={cityRef}
        />
      </fieldset>

      <fieldset>
        <legend>Slots</legend>

        <label htmlFor="vehicles">Vehicles</label>
        <input
          type="number"
          id="vehicles"
          required
          min="0"
          ref={vehicleSlotRef}
        />

        <label htmlFor="moto">Moto</label>
        <input type="moto" id="moto" required min="0" ref={motoSlotRef} />
      </fieldset>

      <fieldset>
        <legend>Pricing</legend>
        <label htmlFor="hourly">Hourly</label>
        <input
          type="number"
          id="hourly"
          required
          min="0"
          ref={hourlyChargeRef}
        />

        <label htmlFor="daily">Daily</label>
        <input type="number" id="daily" required min="0" ref={dailyChargeRef} />
      </fieldset>

      <button>Submit</button>
    </form>
  );
};

export default RegisterParking;
