"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dateFns = require("date-fns");

var _ptBR = _interopRequireDefault(require("date-fns/locale/pt-BR"));

var _Mail = _interopRequireDefault(require("../../lib/Mail"));

var _format = _interopRequireDefault(require("../../util/format"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NewOrderMail = /*#__PURE__*/function () {
  function NewOrderMail() {
    (0, _classCallCheck2["default"])(this, NewOrderMail);
  }

  (0, _createClass2["default"])(NewOrderMail, [{
    key: "handle",
    value: function () {
      var _handle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var data, orderDetails, deliveryFeeLimit, orderTotal, orderSubTotal, deliveryFee, discount, orderDate;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _ref.data;
                orderDetails = data.orderDetails, deliveryFeeLimit = data.deliveryFeeLimit;
                orderTotal = parseFloat(orderDetails.orderTotal).toFixed(2);
                orderSubTotal = parseFloat(orderDetails.orderSubTotal).toFixed(2);
                deliveryFee = parseFloat(orderDetails.deliveryFee).toFixed(2);
                discount = parseFloat(orderDetails.discount).toFixed(2);
                orderDate = (0, _dateFns.format)((0, _dateFns.parseISO)(orderDetails.orderDate), 'PPPpp', {
                  locale: _ptBR["default"]
                });
                _context.next = 9;
                return _Mail["default"].sendMail({
                  to: "".concat(orderDetails.user.name, " <").concat(orderDetails.user.email, ">"),
                  subject: 'Confirmação de compra',
                  template: 'newOrder',
                  context: {
                    user: orderDetails.user.name,
                    orderDate: orderDate,
                    orderNumber: orderDetails.orderNumber,
                    payment_method: orderDetails.payment_method,
                    payment_condition: orderDetails.payment_condition,
                    discount: discount,
                    deliveryFeeLimit: deliveryFeeLimit,
                    deliveryFee: deliveryFee,
                    orderSubTotal: orderSubTotal,
                    orderTotal: orderTotal,
                    paymentMethod: orderDetails.paymentDetails.paymentMethod,
                    paymentCondition: orderDetails.paymentDetails.paymentCondition,
                    creditCardBrand: orderDetails.paymentDetails.creditCardBrand,
                    creditCardLast4Digits: orderDetails.paymentDetails.creditCardLast4Digits,
                    orderProducts: orderDetails.orderProductsGrouped.map(function (category) {
                      return _objectSpread(_objectSpread({}, category), {}, {
                        products: category.products.map(function (p) {
                          return _objectSpread(_objectSpread({}, p), {}, {
                            image_url: p.image.url,
                            price: (0, _format["default"])(p.price),
                            total: (0, _format["default"])(p.total)
                          });
                        })
                      });
                    }),
                    orderProductsCount: orderDetails.orderProductsCount,
                    orderName: orderDetails.shippingDetails.name,
                    postalCode: orderDetails.shippingDetails.postalCode,
                    street: orderDetails.shippingDetails.street,
                    streetN: orderDetails.shippingDetails.streetN,
                    neighborhood: orderDetails.shippingDetails.neighborhood,
                    city: orderDetails.shippingDetails.city,
                    state: orderDetails.shippingDetails.state,
                    complement: orderDetails.shippingDetails.complement,
                    reference: orderDetails.shippingDetails.reference
                  }
                });

              case 9:
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
      return 'NewOrderMail';
    }
  }]);
  return NewOrderMail;
}();

var _default = new NewOrderMail();

exports["default"] = _default;