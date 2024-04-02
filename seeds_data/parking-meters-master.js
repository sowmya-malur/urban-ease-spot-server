const fs = require('fs');

const parkingMetersMasterData = JSON.parse(fs.readFileSync("./data/parking-meters-clean-data.json","utf-8")); // clean data

const formattedParkingMetersData = parkingMetersMasterData.map((parking) => {
    parking.r_mf_9a_6p = parking.r_mf_9a_6p.replace("$", "");
    parking.r_mf_6p_10 = parking.r_mf_6p_10.replace("$", "");
    parking.r_sa_9a_6p = parking.r_sa_9a_6p.replace("$", "");
    parking.r_sa_6p_10 = parking.r_sa_6p_10.replace("$", "");
    parking.r_su_9a_6p = parking.r_su_9a_6p.replace("$", "");
    parking.r_su_6p_10 = parking.r_su_6p_10.replace("$", "");
    return parking;
  });

module.exports = formattedParkingMetersData;
    