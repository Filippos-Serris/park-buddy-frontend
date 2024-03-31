import { useRef } from "react";

const SearchForm = (props) => {
  const { onSearch } = props;

  const cityRef = useRef();
  const arrivalDateRef = useRef();
  const arrivalTimeRef = useRef();
  const departDateRef = useRef();
  const departTimeRef = useRef();
  const vehicleRef = useRef();

  const vehicles = ["fiat", "saxo", "nissan"];

  const submitHandle = (event) => {
    event.preventDefault();

    const searchData = {
      city: cityRef.current.value,
      arrivalDate: arrivalDateRef.current.value,
      arrivalTime: arrivalDateRef.current.value,
      departDate: departDateRef !== null ? departDateRef.current.value : null,
      departTime: departTimeRef !== null ? departTimeRef.current.value : null,
      vehicle: vehicleRef.current.value,
    };

    onSearch(searchData);
  };

  return (
    <div>
      <form onSubmit={submitHandle}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          required
          minLength="4"
          maxLength="20"
          ref={cityRef}
        />

        <div>
          <h3>Arrival</h3>
          <label htmlFor="arrival-date">Date</label>
          <input id="arrival-date" type="date" required ref={arrivalDateRef} />

          <label htmlFor="arrival-time">Time</label>
          <input id="arrival-time" type="time" required ref={arrivalTimeRef} />
        </div>

        <div>
          <h3>Departure</h3>
          <label htmlFor="depart-date">Date</label>
          <input id="depart-date" type="date" ref={departDateRef} />

          <label htmlFor="depart-time">Time</label>
          <input id="depart-time" type="time" ref={departTimeRef} />
        </div>

        <div>
          <label htmlFor="vehicle">Vehicle</label>
          <select id="vehicle" ref={vehicleRef}>
            <option>---select---</option>
            {vehicles.map((vehicle) => (
              <option>{vehicle}</option>
            ))}
          </select>
        </div>

        <button>search</button>
      </form>
    </div>
  );
};

export default SearchForm;
