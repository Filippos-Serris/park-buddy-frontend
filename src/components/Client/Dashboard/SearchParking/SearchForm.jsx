import { useEffect, useRef, useState } from "react";

import "../../../../assets/styles/client/Dashboard/SearchParking/SearchForm.css";

const SearchForm = (props) => {
  const { onSearch } = props;

  const token = localStorage.getItem("token");

  const cityRef = useRef();
  const arrivalDateRef = useRef();
  const arrivalTimeRef = useRef();
  const departDateRef = useRef();
  const departTimeRef = useRef();
  const vehicleRef = useRef();

  const [vehicles, setVehicles] = useState([{}]);
  const [selectedVehicle, setSelectedVehicle] = useState({});

  const submitHandle = (event) => {
    event.preventDefault();

    const searchData = {
      city: cityRef.current.value,
      arrivalDate: arrivalDateRef.current.value,
      arrivalTime: arrivalDateRef.current.value,
      departDate: departDateRef !== null ? departDateRef.current.value : null,
      departTime: departTimeRef !== null ? departTimeRef.current.value : null,
      vehicle: selectedVehicle,
    };

    onSearch(searchData);
  };

  const handleSelectChange = () => {
    const selectedVehicle = vehicleRef.current.value;
    const matchingVehicle = vehicles.find(
      (vehicle) => `${vehicle._id}` === selectedVehicle
    );
    setSelectedVehicle(matchingVehicle);
  };

  useEffect(() => {
    async function fetchVehicles() {
      const res = await fetch("http://localhost:8080/vehicle", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      console.log(resData);
      setVehicles(resData.vehicles);
    }
    fetchVehicles();
  }, []);

  return (
    <div className="search-form-container">
      <h1>Parking search</h1>
      <form className="search-form" onSubmit={submitHandle}>
        <div className="city-container">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            required
            minLength="4"
            maxLength="20"
            ref={cityRef}
          />
        </div>

        <fieldset className="date-container">
          <legend>Arrival</legend>
          <label htmlFor="arrival-date">Date</label>
          <input id="arrival-date" type="date" required ref={arrivalDateRef} />

          <label htmlFor="arrival-time">Time</label>
          <input id="arrival-time" type="time" required ref={arrivalTimeRef} />
        </fieldset>

        <fieldset className="date-container">
          <legend>Departure</legend>
          <label htmlFor="depart-date">Date</label>
          <input id="depart-date" type="date" ref={departDateRef} required />

          <label htmlFor="depart-time">Time</label>
          <input id="depart-time" type="time" ref={departTimeRef} required />
        </fieldset>

        <div className="vehicle-container">
          <label htmlFor="vehicle">Vehicle</label>
          <select id="vehicle" ref={vehicleRef} onChange={handleSelectChange}>
            <option key="default">---select---</option>
            {vehicles.map((data) => (
              <option key={`${data._id}-${data.brand}`} value={data._id}>
                {data.brand} - {data.model}
              </option>
            ))}
          </select>
        </div>
        <p>Information is important</p>
        <button>search</button>
      </form>
    </div>
  );
};

export default SearchForm;
