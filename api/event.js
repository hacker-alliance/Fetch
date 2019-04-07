//IoT Event Manager

var Particle = require('particle-api-js');
var particle = new Particle();
var token;

function lookup(ip) {
  if (ip.startsWith("147.253")) {
    return "Stetson University";
  }
  else {
    return "Unknown";
  }
}

particle.login({username: 'EMAIL', password: 'PASSWORD'}).then(
  function(data) {
    token = data.body.access_token;
    //Get fetch-locationChanged event for specific device
    particle.getEventStream({ deviceId: '380058000751373238323937', name: 'fetch-locationChanged', auth: token }).then(
    function(stream) {
        console.log('Listening to Event Stream');
        stream.on('event', function(event) {
          console.log("Event: ", event);
          console.log("Performing lookup on IP Address: ", event.data);
          let loc = lookup(event.data);
          console.log("Location Found: ", loc);
        });
    },
    function (err) {
        console.log('Unable to Get Event Stream: ', err);
    }
);
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);
