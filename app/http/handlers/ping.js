/**
 * TrackBack ping handler.
 *
 * This component provides an HTTP handler that receives TrackBack pings.
 *
 * In the hexagonal architecture promoted by Bixby.js, this handler drives a
 * linkback port.  The actual adapter that will be utilized is injected by the
 * IoC container, and is expected to be implemented by the application.
 */
exports = module.exports = function(linkbacks, parse, errorLogging, authenticate) {
  var xml = require('xmlbuilder');
  
  
  // TODO: Error if no URL specificifed
  
  function resolveTarget(req, res, next) {
    req.locals = req.locals || {};
    req.locals.target = 'http://www.example.com/' + req.params[0];
    next();
  }
  
  function handle(req, res, next) {
    // TODO: Add title, exerpt, blog name, and language options
    
    linkbacks.ping(req.body.url, req.locals.target, function(err) {
      // TODO: handle errors
      //res.status(202).send('http://alice.host/webmentions/222')
      
      var doc = xml.create('response', { encoding: 'utf-8' })
        .ele('error', '0')
        .end({ pretty: true });
      
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(doc)
    });
  }
  
  function errorHandler(err, req, res, next) {
    var doc = xml.create('response', { encoding: 'utf-8' })
      .ele('error', '1')
      .ele('message', err.message)
      .end({ pretty: true });
    
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(doc)
  }
  
  // curl --data "source=http://bob.host/post-by-bob&target=http://alice.host/post-by-alice" http://127.0.0.1:8080/
  
  // curl --data "title=Foo+Bar&url=http://www.bar.com/&excerpt=My+Excerpt&blog_name=Foo" http://127.0.0.1:8080/trackback
  
  return [
    parse('application/x-www-form-urlencoded'),
    //authenticate([ 'anonymous' ]),
    resolveTarget,
    handle,
    errorLogging(),
    errorHandler
  ];
}

exports['@require'] = [
  'http://schemas.modulate.io/js/social/ILinkbackService',
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/errorLogging'
  //'http://i.bixbyjs.org/http/middleware/authenticate',
];
