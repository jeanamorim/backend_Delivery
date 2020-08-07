"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = convertHourToMinutes;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function convertHourToMinutes(time) {
  var _time$split$map = time.split(':').map(Number),
      _time$split$map2 = (0, _slicedToArray2["default"])(_time$split$map, 2),
      hour = _time$split$map2[0],
      minutes = _time$split$map2[1];

  var timeInMinutes = hour * 60 + minutes;
  return timeInMinutes;
}