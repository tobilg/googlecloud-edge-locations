const chai = require('chai');
const should = chai.should();

const GoogleCloudEdgeLocations = require('../src/index');

chai.config.includeStack = false;

describe("# Testing the googlecloud-edge-locations functionality", function() {
  describe("## Basic functionality testing", function () {
    it("should return the data for IAD", function (done) {
      const el = new GoogleCloudEdgeLocations();

      el.lookup('IAD').should.be.a('object');
      el.lookup('IAD').should.eql({
        "city": "Ashburn",
        "state": "Virginia",
        "country": "United States",
        "countryCode": "US",
        "latitude": 38.94449997,
        "longitude": -77.45580292,
        "count": 1
      });
      done();
    });

    it("should return 'false' if code isn't found", function (done) {
      const el = new GoogleCloudEdgeLocations();

      el.lookup('FOO').should.eql(false);
      done();
    });

    it("should return the correct count of locations", function (done) {
      const el = new GoogleCloudEdgeLocations();

      el.getLocationCount().should.eql(94);
      done();
    });

    it("should return the correct count of Edge Locations", function (done) {
      const el = new GoogleCloudEdgeLocations();

      el.getPoPCount().should.eql(94);
      done();
    });
  });
});
