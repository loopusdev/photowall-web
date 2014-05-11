angular.module('photowallWebApp')
  .factory('services.socket', [
    '$window',
    'services.rest',
    function($window, rest) {

      var listeners = []; // Listeners to be executed when message arrives

      var log = function () {
        if (typeof console !== 'undefined') {
          console.log.apply(console, arguments);
        }
      }

      // as soon as this file is loaded, connect automatically, 
      var socket = $window.io.connect('http://photowall-backend.herokuapp.com:80');
      if (typeof console !== 'undefined') {
        log('Connecting to Sails.js...');
      }

      socket.on('connect', function socketConnected() {

        // Listen for Comet messages from Sails
        socket.on('message', function messageReceived(message) {
          log('New comet message received :: ', message);
          // Execute all listeners
          angular.forEach(listeners, function(listener) {
            listener(message);
          });
        });

        // Register to collection of photos
        // TODO: Move this somewhere else, maybe to controller
        socket.get(rest.baseUrl + 'photo', function (response) {});
      });

      /**
       * @param listener (func(data)) 
       */
      var registerListener = function(listener) {
        listeners = [listener];   // Just one listener supported for now
      };

      return {
        registerListener: registerListener,
      };

    }]);
   
