var _ = require('underscore');

exports.version = require('../package.json').version;

var Mike = function(){
  this.services = [];
};

Mike.prototype.add = function(conditions, fn) {
  this.services.push({conditions: conditions, fn: fn});
  return this;
};

Mike.prototype.serviceMatch = function(data, conditions) {
  var keys = _.keys(conditions);
  for (var k = 0; k < keys.length; k++) {
    if (data[keys[k]] === undefined) {
      return false;
    }
    if (data[keys[k]] != conditions[keys[k]] && '*' != conditions[keys[k]]) {
      return false;
    }
  }

  return true;
};

Mike.prototype.getMatches = function(data) {
  var self = this;
  var matches = [];
  _.forEach(this.services, function(service, id) {
    if (self.serviceMatch(data, service.conditions)) {
      matches.push(service);
    }
  });
  return matches;
};

Mike.prototype.getSortedMatches = function(data) {
  var matches = this.getMatches(data);

  matches = _.map(matches, function(service, i){
    var sortedKeys = _.keys(service.conditions).sort();
    var zeroes = (new Array(4 - (1000 - _.keys(service.conditions).length).toString().length).join('0'));
    var zeroes2 = (new Array(4 - (1000 - i).toString().length).join('0'));
    var sortNumber = zeroes + (999 - _.keys(service.conditions).length);
    var sortNumber2 = zeroes2 + (999 - i);
    service.sortKey = sortNumber + '_' + sortedKeys.join('_') + sortNumber2;
    return service;
  });

  return _.sortBy(matches, function(service){
    return service.sortKey;
  });
};

Mike.prototype.createFunction = function(matches) {
  var self = this;
  var current = matches.shift();
  var parent;
  if (matches.length) {
    parent = this.createFunction(matches);
  }
  return function(){
    current.fn.apply({parent: parent}, arguments);
  };
};

Mike.prototype.act = function(data, cb) {
  if (!this.services.length) {
    return cb(new Error('no commands at all'));
  }

  var matches = this.getSortedMatches(data);

  if (!matches.length) {
    return cb(new Error('no match found'));
  }
  else {
    var targetConditions = matches[0].conditions;

    var filteredMatches = _.filter(matches, function(service){
      return _.isEqual(targetConditions, service.conditions);
    });

    this.createFunction(filteredMatches).call({}, data, cb);
  }
};

exports.create = function () {
  return new Mike();
};
