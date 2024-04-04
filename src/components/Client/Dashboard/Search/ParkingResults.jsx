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
      <ul>
        {availableParkings.map((data) => (
          <li key={data._id}>
            <ParkingResult parkings={data} />
          </li>
        ))}
      </ul>
      <p>----------------Full parking--------------</p>
      <ul>
        {fullParkings.map((data) => (
          <li key={data._id}>
            <ParkingResult parkings={data} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingResults;
