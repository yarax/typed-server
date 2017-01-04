'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = exports.Route = exports.Parameters = undefined;

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Body = _tcomb2.default.Any;

var Parameters = exports.Parameters = _tcomb2.default.interface({
  user: Body,
  fuck: Body
}, 'Parameters');

var Route = exports.Route = _tcomb2.default.interface({
  path: _tcomb2.default.enums.of(['/login']),
  method: _tcomb2.default.enums.of(['post']),
  produces: _tcomb2.default.enums.of(['text/plain'])
}, 'Route');

var Response = exports.Response = _tcomb2.default.String;


module.exports = function (params) {
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