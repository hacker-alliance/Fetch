//IoT Event Manager

var Particle = require('particle-api-js');
var particle = new Particle();
var token;

particle.login({username: '<email>', password: '<password>'}).then(
  function(data) {
    token = data.body.access_token;
    //Get fetch-locationChanged event for specific device
    particle.getEventStream({ deviceId: '<deviceID>', name: 'fetch-locationChanged', auth: token }).then(
    function(stream) {
        stream.on('event', function(data) {
        console.log("Event: ", data);
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
