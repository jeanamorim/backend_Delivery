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

var _dateFns = require("date-fns");

var _ptBR = _interopRequireDefault(require("date-fns/locale/pt-BR"));

var _Mail = _interopRequireDefault(require("../../lib/Mail"));

var OrderCancellationMail = /*#__PURE__*/function () {
  function OrderCancellationMail() {
    (0, _classCallCheck2["default"])(this, OrderCancellationMail);
  }

  (0, _createClass2["default"])(OrderCancellationMail, [{
    key: "handle",
    value: function () {
      var _handle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var data, orderDetails, orderDate;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _ref.data;
                orderDetails = data.orderDetails;
                orderDate = (0, _dateFns.format)((0, _dateFns.parseISO)(orderDetails.orderDate), 'PPPpp', {
                  locale: _ptBR["default"]
                });
                _context.next = 5;
                return _Mail["default"].sendMail({
                  to: "".concat(orderDetails.user.name, " <").concat(orderDetails.user.email, ">"),
                  subject: 'Compra cancelada',
                  template: 'orderCancellation',
                  context: {
                    orderDate: orderDate,
                    orderNumber: orderDetails.orderNumber
                  }
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function handle(_x) {
        return _handle.apply(this, arguments);
      }

      return handle;
    }()
  }, {
    key: "key",
    get: function get() {
      return 'OrderCancellationMail';
    }
  }]);
  return OrderCancellationMail;
}();

var _default = new OrderCancellationMail();

exports["default"] = _default;