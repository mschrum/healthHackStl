const express = require('express');
const noble = require('noble');
const Rx = require('rxjs/Rx');
const cors = require('cors');
const app = express();

app.use(cors());

// app.route('/api/visitors').get((req, res) => {
//     res.send({
//         data: [
//             {
//                 name: 'Matt',
//                 BID: 'Matt\'s iPhone',
//                 active: false
//             },
//             {
//                 name: 'Peter',
//                 BID: 'Peter\'s iPhone',
//                 active: false
//             },
//             {
//                 name: 'Rob',
//                 BID: 'Rob\'s iPhone',
//                 active: false
//             },
//             {
//                 name: 'Melissa',
//                 BID: 'Melissa\'s iPhone',
//                 active: false
//             },
//         ]
//     })
// });

// app.route('/scan').get((req, res) => {
//     if (noble.state === 'poweredOn') {
//         noble.startScanning();
//     } else if (noble.state === 'poweredOff') {
//         noble.state = 'poweredOn';
//         noble.startScanning();
//     } else {
//         return console.log('something went wrong with noble...');
//     }

//     noble.on('discover', function(peripheral) {
//         console.log('Found device with local name: ' + peripheral.advertisement.localName);
//         console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
//         console.log();
//     });
// });

// app.listen(8000, () => {
//     console.log('Server listening on port 8000...');
//   });