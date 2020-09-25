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

var _Variacao = _interopRequireDefault(require("../models/Variacao"));

var _Schedule = _interopRequireDefault(require("../models/Schedule"));

/* eslint-disable func-names */
var ScheduleControllers = /*#__PURE__*/function () {
  function ScheduleControllers() {
    (0, _classCallCheck2["default"])(this, ScheduleControllers);
  }

  (0, _createClass2["default"])(ScheduleControllers, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var schedule, classSchedule;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                schedule = req.body.schedule;
                classSchedule = schedule.map(function (item) {
                  return {
                    estabelecimento_id: req.estabelecimentoId,
                    week_day: item.week_day,
                    from: item.from,
                    to: item.to
                  };
                });

                _Schedule["default"].bulkCreate(classSchedule).then(function () {
                  return _Schedule["default"].findAll();
                }).then(function (response) {
                  res.json(response);
                })["catch"](function (error) {
                  res.json(error);
                });

              case 3:
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
        var schedule;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Schedule["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId
                  },
                  order: [['id', 'DESC']],
                  attributes: ['id', 'week_day', 'from', 'to']
                });

              case 2:
                schedule = _context2.sent;
                return _context2.abrupt("return", res.json(schedule));

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
        var hours, _yield$hours$update, from, to, week_day;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Schedule["default"].findByPk(req.params.id);

              case 2:
                hours = _context3.sent;
                _context3.next = 5;
                return hours.update(req.body);

              case 5:
                _yield$hours$update = _context3.sent;
                from = _yield$hours$update.from;
                to = _yield$hours$update.to;
                week_day = _yield$hours$update.week_day;
                return _context3.abrupt("return", res.json({
                  from: from,
                  to: to,
                  week_day: week_day
                }));

              case 10:
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
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _Schedule["default"].destroy({
                  where: {
                    id: req.params.id
                  }
                });

              case 2:
                return _context4.abrupt("return", res.json());

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return ScheduleControllers;
}();

var _default = new ScheduleControllers();

exports["default"] = _default;