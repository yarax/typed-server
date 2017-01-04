'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = exports.route = exports.Parameters = undefined;

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

var _types = require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _tcomb2.default.interface({
  login: _tcomb2.default.String,
  pass: _tcomb2.default.String
}, 'User');

var Parameters = exports.Parameters = _tcomb2.default.interface({
  user: _types.Body
}, 'Parameters');

module.exports.parameters = function (req) {
  return { user: req.body.user };
};
var Route = _tcomb2.default.interface({
  path: _tcomb2.default.String,
  method: _tcomb2.default.String,
  produces: _tcomb2.default.maybe(_tcomb2.default.String)
}, 'Route');

var route = exports.route = _assert({
  path: '/login',
  method: 'post',
  produces: 'text/plain'
}, Route, 'route');

var Response = exports.Response = _tcomb2.default.String;


module.exports.controller = function (params) {
  _assert(params, Parameters, 'params');

  var ret = function (params) {
    return 'Hi, ' + params.user.login;
  }.call(undefined, params);

  _assert(ret, Response, 'return value');

  return ret;
};

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