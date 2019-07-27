const { getAllBeaconsVectors, logVectors } = require("./index");

// sort fn
function byDepartment(a, b) {
  return a.department > b.department ? 1 : a.department < b.department ? -1 : 0;
}

describe("file-parsing problem test suite", function() {
  it("works", () => {
    const antennaIds = [201, 202];
    // prettier-ignore
    const input = [
      {"BeaconId":208, "ant_id":202, "dbm_ant":-68.74636830519334, "timestamp":"2016-11-22T09:46:00.000Z"},
      {"BeaconId":112, "ant_id":202, "dbm_ant":-46.17761120301083, "timestamp":"2016-11-22T09:47:00.00Z"},
      {"BeaconId":112, "ant_id":201, "dbm_ant":-84.76679099514944, "timestamp":"2016-11-22T09:47:00.00Z"},
      {"BeaconId":113, "ant_id":201, "dbm_ant":-21.014170982048675, "timestamp":"2016-11-22T09:48:00.00Z"},
      {"BeaconId":112, "ant_id":202, "dbm_ant":-9.045625900937893, "timestamp":"2016-11-22T09:49:00.00Z"},
    ]

    expect(getAllBeaconsVectors(input, antennaIds).sort(byDepartment)).toEqual(
      [
        {
          department: "208, 2016-11-22T09:46:00.000Z",
          vector: [-135, -68.74636830519334]
        },
        {
          department: "112, 2016-11-22T09:47:00.00Z",
          vector: [-84.76679099514944, -46.17761120301083]
        },
        {
          department: "113, 2016-11-22T09:48:00.00Z",
          vector: [-21.014170982048675, -135]
        },
        {
          department: "112, 2016-11-22T09:49:00.00Z",
          vector: [-135, -9.045625900937893]
        }
      ].sort(byDepartment)
    );
  });

  it("ignores unspecified antenna ids", () => {
    const antennaIds = [201, 202];
    // prettier-ignore
    const input = [
      {"BeaconId":666, "ant_id":666, "dbm_ant":-21.014170982048675, "timestamp":"2016-11-22T09:46:00.000Z"},
      {"BeaconId":777, "ant_id":202, "dbm_ant":-9.045625900937893, "timestamp":"2016-11-22T09:46:00.000Z"},
      {"BeaconId":777, "ant_id":555, "dbm_ant":-9.045625900937893, "timestamp":"2016-11-22T09:46:00.000Z"},
    ]

    expect(getAllBeaconsVectors(input, antennaIds).sort(byDepartment)).toEqual(
      [
        {
          department: "666, 2016-11-22T09:46:00.000Z",
          vector: [-135, -135]
        },
        {
          department: "777, 2016-11-22T09:46:00.000Z",
          vector: [-135, -9.045625900937893]
        }
      ].sort(byDepartment)
    );
  });

  it("handles empty input", () => {
    const antennaIds = [201, 202];
    const input = [];
    expect(getAllBeaconsVectors(input, antennaIds)).toEqual([]);
  });

  it("handles empty antenna ids", () => {
    const antennaIds = [];
    // prettier-ignore
    const input = [
      {"BeaconId":208, "ant_id":202, "dbm_ant":-68.74636830519334, "timestamp":"2016-11-22T09:46:00.000Z"},
      {"BeaconId":112, "ant_id":202, "dbm_ant":-46.17761120301083, "timestamp":"2016-11-22T09:47:00.00Z"},
    ]
    expect(getAllBeaconsVectors(input, antennaIds).sort(byDepartment)).toEqual(
      [
        {
          department: "208, 2016-11-22T09:46:00.000Z",
          vector: []
        },
        {
          department: "112, 2016-11-22T09:47:00.00Z",
          vector: []
        }
      ].sort(byDepartment)
    );
  });

  // don't take this test really seriously
  it("output for real data looks similar as in readme", () => {
    expect(logVectors()).toContain(
      '[{"department":"208, 2016-11-22T09:46:00.000Z","vector":[-92.32518086711575,-68.74636830519334,-42.266007838893046,-135,-77.80792406374334,-19.698948991976884]},{"department":"112, 2016-11-22T09:47:00.00Z","vector":[-84.76679099514944,'
    );
  });
});
