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
    <div>
      <h2>Available parkings in the area</h2>
      <ul>
        {availableParkings.map((data) => (
          <li>
            <ParkingResult parkings={data} />
          </li>
        ))}
      </ul>
      <p>----------------Full parking--------------</p>
      <ul>
        {fullParkings.map((data) => (
          <li>
            <ParkingResult parkings={data} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingResults;
