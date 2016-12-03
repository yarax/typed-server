'use strict';

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyHandler = function bodyHandler(req, paramName) {
  return req.body;
};

var Params = _tcomb2.default.interface({
  user: _tcomb2.default.interface({
    login: _tcomb2.default.String,
    pass: _tcomb2.default.String
  })
}, 'Params');

var Response = _tcomb2.default.interface({
  result: _tcomb2.default.Any,
  headers: _tcomb2.default.maybe(_tcomb2.default.interface({
    string: _tcomb2.default.String
  })),
  status: _tcomb2.default.maybe(_tcomb2.default.Number)
}, 'Response');

var Route = _tcomb2.default.interface({
  path: _tcomb2.default.String,
  method: _tcomb2.default.String,
  parameters: _tcomb2.default.Object,
  controller: _tcomb2.default.Function
}, 'Route');

var LoginRoute = {
  path: '/login',
  method: 'post',
  parameters: {
    user: bodyHandler
  },
  controller: function controller(params) {
    _assert(params, Params, 'params');

    var ret = function (params) {
      return {
        result: 'Hi, ' + params.user.login
      };
    }.call(undefined, params);

    _assert(ret, Response, 'return value');

    return ret;
  },
  produces: 'application/json'
};

module.exports = [LoginRoute];

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