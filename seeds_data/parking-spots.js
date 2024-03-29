const parkingMetersMasterData = require("../seeds_data/parking-meters-master.js");
const statusOptions = ["vacant", "occupied", "broken"];

const parkingSpotData = parkingMetersMasterData.map((parking) => {
  const newParkingSpot = {
    meter_id: parking.meterid,
    location: parking.geo_point_2d,
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
  };
  return newParkingSpot;
});

module.exports = parkingSpotData;
