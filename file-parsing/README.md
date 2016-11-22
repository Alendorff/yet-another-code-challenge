As input we have a database which we collected during a beacon tracking test. The table is made from logs from different wifi antennas. Every timestamp we did a recording of each of this antennas which gives us table entries like this:

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
in order to do further calculations we need file wich maps the beacon id to an an array with all the recorded dbm values for all our antennas. The output for this beacon should look like:
```
{
  beacon: '111, 2016-10-26 00:11:00',
  vector: [
    -85.8333,
     -40.111,
     -20.023
  ]
}
```

please write a script which outputs the vectors for all beacons. The input file can be found in *input.js*. The output can be logged to the console or be written to a file
