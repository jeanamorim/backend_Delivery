"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  dsn: process.env.NODE_ENV !== 'development' ? process.env.SENTRY_DSN : ''
};
exports["default"] = _default;