"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ioredis = _interopRequireDefault(require("ioredis"));

var Cache = /*#__PURE__*/function () {
  function Cache() {
    (0, _classCallCheck2["default"])(this, Cache);
    this.redis = new _ioredis["default"]({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      keyPrefix: 'cache:'
    });
  }

  (0, _createClass2["default"])(Cache, [{
    key: "set",
    value: function set(key, value) {
      return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
    }
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(key) {
        var cached;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.redis.get(key);

              case 2:
                cached = _context.sent;
                return _context.abrupt("return", cached ? JSON.parse(cached) : null);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "invalidate",
    value: function invalidate(key) {
      return this.redis.del(key);
    }
  }, {
    key: "invalidatePrefix",
    value: function () {
      var _invalidatePrefix = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(prefix) {
        var keys, keysWithoutPrefix;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.redis.keys("cache:".concat(prefix, ":*"));

              case 2:
                keys = _context2.sent;
                keysWithoutPrefix = keys.map(function (key) {
                  return key.replace('cache:', '');
                });

                if (!(keysWithoutPrefix.length > 0)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", this.redis.del(keysWithoutPrefix));

              case 6:
                return _context2.abrupt("return", null);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function invalidatePrefix(_x2) {
        return _invalidatePrefix.apply(this, arguments);
      }

      return invalidatePrefix;
    }()
  }, {
    key: "invalidateAll",
    value: function invalidateAll() {
      return this.redis.flushall();
    }
  }]);
  return Cache;
}();

var _default = new Cache();

exports["default"] = _default;