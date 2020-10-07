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

var _Setting = _interopRequireDefault(require("../models/Setting"));

var SettingController = /*#__PURE__*/function () {
  function SettingController() {
    (0, _classCallCheck2["default"])(this, SettingController);
  }

  (0, _createClass2["default"])(SettingController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var settings, createSettings;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Setting["default"].findAll();

              case 2:
                settings = _context.sent;

                if (!settings.length) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: 'Settings have already been created'
                }));

              case 5:
                _context.next = 7;
                return _Setting["default"].create(req.body);

              case 7:
                createSettings = _context.sent;
                return _context.abrupt("return", res.json(createSettings));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function store(_x, _x2) {
        return _store.apply(this, arguments);
      }

      return store;
    }()
  }, {
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var settings;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Setting["default"].findAll();

              case 2:
                settings = _context2.sent;
                return _context2.abrupt("return", res.json(settings));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function index(_x3, _x4) {
        return _index.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var settings, settingsUpdated;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Setting["default"].findByPk(1);

              case 2:
                settings = _context3.sent;
                _context3.next = 5;
                return settings.update(req.body);

              case 5:
                settingsUpdated = _context3.sent;
                return _context3.abrupt("return", res.json(settingsUpdated));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return SettingController;
}();

var _default = new SettingController();

exports["default"] = _default;