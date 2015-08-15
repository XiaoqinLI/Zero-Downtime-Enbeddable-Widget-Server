var port = process.env.PORT || 1337;        // set our port

module.exports = {
  port: port,
  request_timeout: 100000,
  test: false,
  mongoose_url: "mongodb://localhost:27017/internDatabase",
  contact_email: "daybreaklee@utexas.edu",
  host: "http://localhost:" + port
};