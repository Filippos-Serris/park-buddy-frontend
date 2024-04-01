const ParkingResult = (props) => {
  const { parkings } = props;

  return (
    <div>
      <h2>{parkings.name}</h2>
      {parkings.availableSlots.car === 0 &&
        parkings.availableSlots.moto === 0 && <h1>FULL</h1>}
      <p>
        Address:
        {`${parkings.location.street} ${parkings.location.number}, ${parkings.location.city} ${parkings.location.postal}`}
      </p>

      <p>
        Available slots cars:{`${parkings.availableSlots.car}`}, moto:
        {`${parkings.availableSlots.moto}`}
      </p>
    </div>
  );
};

export default ParkingResult;
