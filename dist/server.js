"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _app = _interopRequireDefault(require("./app"));

var port = process.env.PORT || 3005;

_app["default"].listen(port);