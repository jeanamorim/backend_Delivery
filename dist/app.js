"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _youch = _interopRequireDefault(require("youch"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

require("express-async-errors");

var _websocket = require("./websocket");

var _routes2 = _interopRequireDefault(require("./routes"));

var _sentry = _interopRequireDefault(require("./config/sentry"));

require("./database");

/* eslint-disable import/named */
// import rateLimiter from './app/middlewares/rateLimiter';
var App = /*#__PURE__*/function () {
  function App() {
    (0, _classCallCheck2["default"])(this, App);
    this.server = (0, _express["default"])();
    this.socket = _http["default"].Server(this.server);
    (0, _websocket.setupWebSocket)(this.socket);
    Sentry.init(_sentry["default"]);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  (0, _createClass2["default"])(App, [{
    key: "middlewares",
    value: function middlewares() {
      this.server.use(Sentry.Handlers.requestHandler());
      this.server.use((0, _helmet["default"])());
      this.server.use((0, _cors["default"])());
      this.server.use(_express["default"].json());
      this.server.use('/files', _express["default"]["static"](_path["default"].resolve(__dirname, '..', 'tmp', 'uploads'))); // if (process.env.NODE_ENV !== 'development') {
      //   this.server.use(rateLimiter);
      // }
    }
  }, {
    key: "routes",
    value: function routes() {
      this.server.use(_routes2["default"]);
      this.server.use(Sentry.Handlers.errorHandler());
    }
  }, {
    key: "exceptionHandler",
    value: function exceptionHandler() {
      this.server.use( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, req, res, next) {
          var errors;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(process.env.NODE_ENV === 'development')) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 3;
                  return new _youch["default"](err, req).toJSON();

                case 3:
                  errors = _context.sent;
                  return _context.abrupt("return", res.status(500).json(errors));

                case 5:
                  return _context.abrupt("return", res.status(500).json({
                    error: 'Internal server error'
                  }));

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return App;
}();

var _default = new App().socket;
exports["default"] = _default;