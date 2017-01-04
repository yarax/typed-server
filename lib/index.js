'use strict';

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();
var routes = require('./routes/users');
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '64mb' }));

app.use(function (req, res, next) {
  var route = routes.find(function (r) {
    return r.method.toLowerCase() === req.method.toLowerCase() && r.path === req.path;
  }); // @TODO make regex match with passing through req.params
  if (!route) {
    return res.status(404).end();
  }
  var params = Object.keys(route.parameters).reduce(function (res, paramName) {
    _assert(res, _tcomb2.default.Object, 'res');

    _assert(paramName, _tcomb2.default.String, 'paramName');

    res[paramName] = route.parameters[paramName](req, paramName);
    return res;
  }, {});
  var response = void 0;
  try {
    response = route.controller(params);
  } catch (e) {
    return next(e);
  }
  // set cookie
  // set status
  res.send(response.result);
});

app.use(function (err, req, res, next) {
  res.status(500).send(err.message);
});

app.listen(3003, console.log);

function _assert(x, type, name) {
  if (false) {
    _tcomb2.default.fail = function (message) {
      console.warn(message);
    };
  }

  if (_tcomb2.default.isType(type) && type.meta.kind !== 'struct') {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcomb2.default.getTypeName(type)]);
    }
  } else if (!(x instanceof type)) {
    _tcomb2.default.fail('Invalid value ' + _tcomb2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcomb2.default.getTypeName(type) + ')');
  }

  return x;
}