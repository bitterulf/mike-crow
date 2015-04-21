mc.add( {get: 'travelLocations'}, function(data, callback){
  // call the parent functionality
  this.parent.call(this, data, function(err, result) {
    // add own values to that result
    result.push('forrest');
    callback(null, result);
  });
});
