/**
 * TrackBack service.
 *
 * This component provides an HTTP service that implements [TrackBack](http://archive.cweiske.de/trackback/trackback-1.2.html).
 * TrackBack is a way to receive a notification when one web resource links to
 * another resource.
 *
 * In the hexagonal architecture promoted by Bixby.js, this service is an
 * adapter to a linkback port.  The adapter implements TrackBack, which is
 * suitable for use by user agents and remote services to notify the application
 * of links back to application resources.
 *
 * References:
 *   - [Trackback](https://en.wikipedia.org/wiki/Trackback)
 */
exports = module.exports = function(pingHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.post('/*', pingHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.modulate.io/js/http/TrackBackService'
];
exports['@require'] = [
  './handlers/ping'
];
