/**
* the router for physician
*/

module.exports = function(express) {
  var Physician = require('./model'),
      router = express.Router();      

/*----------------------------helper functions------------------------------*/
  var getRequest = function(req, res) {
    if (req.params.id) {
      Physician.findById(req.params.id, function(err, physician) {
        if (err) {
          res.send(err);
        }
        res.json(physician);
      });    
    }else {
      Physician.find(function(err, physicians) {
        if (err) {
          res.send(err);
        }
        res.json(physicians);
      });
    }
  };

  var postRequest = function(req, res) {
    if (Object.keys(req.body).length > 0) {
      var physician = new Physician();   

      lodashMergeFunc(physician, req.body);

      physician.save(function(err) {
        if (err){
          res.send(err);
        }     
        res.json({ message: 'physician created!' });
      });
    }else{
      res.json({ message: 'no information added!' });
    }

  };

  var putRequest = function(req, res) {
    Physician.findById(req.params.id, function(err, physician) {
      if (err){
        res.send(err);
      }

      if (Object.keys(req.body).length > 0) {
        lodashMergeFunc(physician, req.body);

        physician.save(function(err) {
          if (err){
            res.send(err);
          }
          res.json({ message: 'physician updated!' });
        });
      }else { 
        res.json({ message: 'no information added!' });
      }

    });
  };

  var deleteRequest = function(req, res) {
    Physician.remove({
        _id: req.params.id
    }, function(err, physician) {
        if (err){
          res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
  };

  /*-------------------------------------------------------------------*/


  // middleware to use for all requests
  router.use(function(req, res, next) {
      // do logging
      console.log('Something is happening.');
      next(); // make sure we go to the next routes and don't stop here
  });

  router.route('/physicians')
    // create a physician
    .post(postRequest)

    // get all physicians
    .get(getRequest);

  router.route('/physicians/:id')
    // get the physician with that id
    .get(getRequest)

    // update the physician with this id
    .put(putRequest)

    // delete the physician with this id
    .delete(deleteRequest);

  return router;

};



