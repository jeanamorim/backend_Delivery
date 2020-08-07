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

var _database = _interopRequireDefault(require("../database"));

var _Order = _interopRequireDefault(require("../app/models/Order"));

// import Estabelecimento from '../app/models/Estabelecimento';
// Queue from '../lib/Queue';
// import Cache from '../lib/Cache';
// import OrderCancellationMail from '../app/jobs/OrderCancellationMail';
var sequelize = _database["default"].connection;
var transaction;

var CancelOrderService = /*#__PURE__*/function () {
  function CancelOrderService() {
    (0, _classCallCheck2["default"])(this, CancelOrderService);
  }

  (0, _createClass2["default"])(CancelOrderService, [{
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var order_id, order;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                order_id = _ref.order_id;
                _context.prev = 1;
                _context.next = 4;
                return sequelize.transaction();

              case 4:
                transaction = _context.sent;
                _context.next = 7;
                return _Order["default"].findByPk(order_id, {
                  attributes: ['id', 'date', 'estabelecimento_id', 'status', 'canceled_at']
                });

              case 7:
                order = _context.sent;

                if (!order.canceled_at) {
                  _context.next = 10;
                  break;
                }

                throw new Error('This order has already been canceled');

              case 10:
                order.canceled_at = new Date();
                order.status = 'CANCELADO';
                _context.next = 14;
                return order.save(transaction);

              case 14:
                _context.next = 16;
                return transaction.commit();

              case 16:
                return _context.abrupt("return", order);

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](1);

                if (!transaction) {
                  _context.next = 24;
                  break;
                }

                _context.next = 24;
                return transaction.rollback();

              case 24:
                throw new Error(_context.t0);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 19]]);
      }));

      function run(_x) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return CancelOrderService;
}();

var _default = new CancelOrderService();

exports["default"] = _default;