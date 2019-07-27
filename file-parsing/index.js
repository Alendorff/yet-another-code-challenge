const inputFile = require("./input").input;
const antennaIds = [201, 202, 203, 204, 205, 206];
const DEFAULT_DBM = -135;

module.exports = {
  getAllBeaconsVectors,
  logVectors
};

function logVectors() {
  return JSON.stringify(getAllBeaconsVectors())
}

/**
 * @typedef {Object} BeaconLogRecord
 * @property {number} BeaconId
 * @property {number} ant_id
 * @property {number} dbm_ant
 * @property {string} timestamp - ISO date string
 */

/**
 * @typedef {Object} BeaconVector
 * @property {string} department - `<BeaconId>, <timestamp>`
 * @property {number[]} vector of dbm_ant
 */

/**
 * @param {BeaconLogRecord[]} input
 * @param {number[]} antIds
 * @return {BeaconVector[]}
 */
function getAllBeaconsVectors(input = inputFile, antIds = antennaIds) {
  /** @type {Map.<string, BeaconVector>} */
  const outputMap = new Map();

  input.forEach(v => {
    const department = `${v.BeaconId}, ${v.timestamp}`;
    const indexInVector = antIds.findIndex(id => id === v.ant_id);
    if (!outputMap.get(department)) {
      outputMap.set(department, {
        department,
        vector: antIds.map(() => DEFAULT_DBM)
      });
    }
    if (indexInVector > -1) {
      outputMap.get(department).vector[indexInVector] = v.dbm_ant;
    }
  });

  return [...outputMap.values()];
}
