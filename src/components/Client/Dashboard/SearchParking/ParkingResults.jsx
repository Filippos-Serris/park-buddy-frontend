import "../../../../assets/styles/client/Dashboard/SearchParking/ParkingResults.css";

import ParkingResult from "./ParkingResult";

const ParkingResults = (props) => {
  const { parkings } = props;

  const availableParkings = [];
  const fullParkings = [];

  parkings.map((data) => {
    if (data.availableSlots.car === 0) {
      fullParkings.push(data);
    } else {
      availableParkings.push(data);
    }
  });

  return (
    <div className="parkings-container">
      {availableParkings.length !== 0 && (
        <div className="parking-category">
          <h3>Available parkings</h3>
          <ul>
            {availableParkings.map((data) => (
              <li key={data._id}>
                <ParkingResult parkings={data} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {fullParkings.length !== 0 && (
        <div className="parking-category">
          <h3>Up this point all parking are n full capacity</h3>
          <ul>
            {fullParkings.map((data) => (
              <li key={data._id}>
                <ParkingResult parkings={data} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ParkingResults;
