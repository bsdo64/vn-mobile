const io = require('socket.io-client');

let manager;
let NotiSocket, PointSocket, VenalinkSocket;
if (process.env.NODE_ENV === 'production') {
  manager = io.Manager('http://io.venacle.com');
} else {
  manager = io.Manager('http://localhost:3003');
}

VenalinkSocket = manager.socket('/venalink', { reconnect: true });
NotiSocket = manager.socket('/noti', { reconnect: true });
PointSocket = manager.socket('/point', { reconnect: true });

exports.Point = PointSocket;
exports.Noti = NotiSocket;
exports.Venalink = VenalinkSocket;