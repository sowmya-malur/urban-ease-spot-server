const parkingMetersMasterData = require("../seeds_data/parking-meters-master.js");
const statusOptions = ["vacant", "occupied", "under maintenance", "broken", "expired"];

const parkingSpotData = parkingMetersMasterData.map((parking)=>{
    const newParkingSpot = {
        meter_id: parking.meterid,
        location: parking.geo_point_2d,
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
    }
     console.log("newParkingSpot", newParkingSpot); // TODO: del
    return newParkingSpot;
});

module.exports = parkingSpotData;