const fs = require('fs');

// TODO: change to the most recent version of json file.
const parkingMetersMasterData = JSON.parse(fs.readFileSync("./data/parking-meter-limited.json","utf-8"));

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
    