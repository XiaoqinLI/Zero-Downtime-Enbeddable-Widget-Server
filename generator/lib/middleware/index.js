'use strict';

var ejs = require('ejs');

var cors;

cors = function(req, res, next) {
	console.log('middleware called')
    //only for paths that come under /api/3rd
    if (true) {
        var partyId = req.query.partyId || 2;

        var corsOrigin = req.headers.origin;
        var corsMethod = req.headers['access-control-request-method'];
        var corsHeaders = req.headers['access-control-request-headers'];
        var hasACorsFlag = corsOrigin || corsMethod || corsHeaders;
        //console.log('cors middleware xhr', hasACorsFlag, corsOrigin, corsMethod, corsHeaders);
        if (hasACorsFlag) {
            res.header('Access-Control-Allow-Origin', corsOrigin);
            res.header('Access-Control-Allow-Methods', corsMethod);
            res.header('Access-Control-Allow-Headers', corsHeaders);
            res.header('Access-Control-Max-Age', 60 * 60 * 24);
            if (req.method === 'OPTIONS') {
                res.status(200).end();
                return;
            }
        }
    }
    next();
};

module.exports = function(app) {

  app.use(cors);

  // Express engine Settings
  app.set('view engine', 'jade');
  app.engine('js', ejs.renderFile);

  // Middleware
};