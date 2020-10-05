"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _Queue = _interopRequireDefault(require("./lib/Queue"));

_Queue["default"].processQueue();