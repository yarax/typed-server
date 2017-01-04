"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteType = exports.Body = undefined;

var _tcomb = require("tcomb");

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Body = exports.Body = _tcomb2.default.Any;

var RouteType = exports.RouteType = _tcomb2.default.interface({
  path: _tcomb2.default.String,
  method: _tcomb2.default.String,
  produces: _tcomb2.default.maybe(_tcomb2.default.String)
}, "RouteType");