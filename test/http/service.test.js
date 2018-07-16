/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../app/http/service');


describe('http/service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal([
      'http://i.bixbyjs.org/http/Service',
      'http://schemas.modulate.io/js/social/notifications/trackback/HTTPService'
    ]);
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('create', function() {
    function pingHandler() {};
    
    var service = factory(pingHandler);
  
    it('should construct handler', function() {
      expect(service).to.be.a('function');
      expect(service.length).to.equal(3);
    });
  });
  
});
