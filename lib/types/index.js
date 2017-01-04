"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtractCodomain = exports.Handler = exports.Route = exports.Extract = exports.Response = undefined;

var _tcomb = require("tcomb");

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Response = exports.Response = _tcomb2.default.interface({
  result: _tcomb2.default.Any,
  headers: _tcomb2.default.maybe(_tcomb2.default.dict(_tcomb2.default.String, _tcomb2.default.String)),
  status: _tcomb2.default.maybe(_tcomb2.default.Number)
}, "Response");

var Extract = exports.Extract = _tcomb2.default.Any;

var Route = exports.Route = _tcomb2.default.interface({
  path: _tcomb2.default.String,
  method: _tcomb2.default.String,
  parameters: _tcomb2.default.Object,
  controller: _tcomb2.default.Function
}, "Route");

var Handler = exports.Handler = _tcomb2.default.Function;
var ExtractCodomain = exports.ExtractCodomain = _tcomb2.default.Function;