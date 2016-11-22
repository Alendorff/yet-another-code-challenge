### beacon-vector-file generator

The goal of this exercise is to generate a list that contains all beacons at certain timestamps with their corresponding support vector.

As input we have a database which we collected during a beacon tracking test. The table is made from logs from different wifi antennas. At every timestamp we did a recording of each of this antennas which gives us table entries like this:

```
{ BeaconId: 111,
  ant_id: 1,
  dbm_ant: -85.8333,
  timestamp: '2016-10-26 00:11:00'
},
{ BeaconId: 111,
  ant_id: 2,
  dbm_ant: -40.111,
  timestamp: '2016-10-26 00:11:00'
},
{ BeaconId: 111,
  ant_id: 3,
  dbm_ant: -20.023,
  timestamp: '2016-10-26 00:11:00'
}
```
In order to do further calculations we need a file wich maps the beacon id to an an given antennas array (see ``index.js``, please keep order) with all the recorded dbm values (if the dbm value is missing a standard value of ``-135`` should be assigned). The output for this beacon should look like:
```
{
  beacon: '111, 2016-10-26 00:11:00',
  vector: [
    -85.8333, // dbm for ant_id: 1
     -40.111, // dbm for ant_id: 2
     -20.023  // dbm for ant_id: 3
  ]
}
```

Please write a script which outputs the vectors for all beacons. The input file can be found in ``input.js``. The output can be logged to the console or be written to a file.

**BONUS:** The table we use in production has more than 3 Million entries. Write the code so it can handle large amount of IO data.
