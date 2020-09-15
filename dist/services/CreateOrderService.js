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

var _database = _interopRequireDefault(require("../database"));

var _Order = _interopRequireDefault(require("../app/models/Order"));

var _OrderDetail = _interopRequireDefault(require("../app/models/OrderDetail"));

var _Product = _interopRequireDefault(require("../app/models/Product"));

var _Category = _interopRequireDefault(require("../app/models/Category"));

var _File = _interopRequireDefault(require("../app/models/File"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// import Setting from '../app/models/Setting';
var _require = require('../websocket'),
    sendMessage = _require.sendMessage; // import Queue from '../lib/Queue';
// import Cache from '../lib/Cache';
// import NewOrderMail from '../app/jobs/NewOrderMail';


var sequelize = _database["default"].connection;
var transaction;

var CreateOrderService = /*#__PURE__*/function () {
  function CreateOrderService() {
    (0, _classCallCheck2["default"])(this, CreateOrderService);
  }

  (0, _createClass2["default"])(CreateOrderService, [{
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var user_id, estabelecimento_id, status, addressee, observacao, troco, ship_postal_code, ship_street, ship_street_n, ship_neighborhood, ship_city, ship_state, _data$ship_complement, ship_complement, _data$ship_reference, ship_reference, _data$delivery_fee, delivery_fee, _data$discount, discount, payment_method, _data$payment_conditi, payment_condition, _data$cc_brand, cc_brand, _data$cc_last_4_digit, cc_last_4_digits, products, orderSubTotal, orderTotal, pedido, order_details;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return sequelize.transaction();

              case 3:
                transaction = _context.sent;
                user_id = data.user_id, estabelecimento_id = data.estabelecimento_id, status = data.status, addressee = data.addressee, observacao = data.observacao, troco = data.troco, ship_postal_code = data.ship_postal_code, ship_street = data.ship_street, ship_street_n = data.ship_street_n, ship_neighborhood = data.ship_neighborhood, ship_city = data.ship_city, ship_state = data.ship_state, _data$ship_complement = data.ship_complement, ship_complement = _data$ship_complement === void 0 ? null : _data$ship_complement, _data$ship_reference = data.ship_reference, ship_reference = _data$ship_reference === void 0 ? null : _data$ship_reference, _data$delivery_fee = data.delivery_fee, delivery_fee = _data$delivery_fee === void 0 ? 0 : _data$delivery_fee, _data$discount = data.discount, discount = _data$discount === void 0 ? 0 : _data$discount, payment_method = data.payment_method, _data$payment_conditi = data.payment_condition, payment_condition = _data$payment_conditi === void 0 ? 0 : _data$payment_conditi, _data$cc_brand = data.cc_brand, cc_brand = _data$cc_brand === void 0 ? null : _data$cc_brand, _data$cc_last_4_digit = data.cc_last_4_digits, cc_last_4_digits = _data$cc_last_4_digit === void 0 ? null : _data$cc_last_4_digit, products = data.products;
                orderSubTotal = products.reduce(function (result, _ref) {
                  var total = _ref.total;
                  return result + total;
                }, 0);
                orderTotal = orderSubTotal + delivery_fee - discount;
                _context.next = 9;
                return _Order["default"].create({
                  date: new Date(),
                  user_id: user_id,
                  estabelecimento_id: estabelecimento_id,
                  status: status,
                  addressee: addressee,
                  observacao: observacao,
                  troco: troco,
                  ship_postal_code: ship_postal_code,
                  ship_street: ship_street,
                  ship_street_n: ship_street_n,
                  ship_neighborhood: ship_neighborhood,
                  ship_city: ship_city,
                  ship_state: ship_state,
                  ship_complement: ship_complement,
                  ship_reference: ship_reference,
                  delivery_fee: delivery_fee,
                  discount: discount,
                  subtotal: orderSubTotal,
                  total: orderTotal,
                  payment_method: payment_method,
                  payment_condition: payment_condition,
                  cc_brand: cc_brand,
                  cc_last_4_digits: cc_last_4_digits
                }, transaction);

              case 9:
                pedido = _context.sent;
                sendMessage('new-order', pedido); // add order products to db

                _context.next = 13;
                return _OrderDetail["default"].bulkCreate(products.map(function (product) {
                  return _objectSpread({
                    order_id: pedido.id
                  }, product);
                }));

              case 13:
                _context.next = 15;
                return _OrderDetail["default"].findAll({
                  where: {
                    order_id: pedido.id
                  },
                  attributes: ['quantity', 'price', 'total'],
                  include: [{
                    model: _Product["default"],
                    as: 'product',
                    attributes: ['name', 'quantity', 'unit'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['id', 'name', 'url']
                    }, {
                      model: _Category["default"],
                      as: 'category',
                      attributes: ['name']
                    }]
                  }]
                });

              case 15:
                order_details = _context.sent;
                _context.next = 18;
                return transaction.commit();

              case 18:
                return _context.abrupt("return", {
                  id: pedido.id,
                  date: pedido.date,
                  user_id: user_id,
                  status: status,
                  addressee: addressee,
                  observacao: observacao,
                  troco: troco,
                  ship_postal_code: ship_postal_code,
                  ship_street: ship_street,
                  ship_street_n: ship_street_n,
                  ship_neighborhood: ship_neighborhood,
                  ship_city: ship_city,
                  ship_state: ship_state,
                  ship_complement: ship_complement,
                  ship_reference: ship_reference,
                  delivery_fee: delivery_fee,
                  discount: discount,
                  subtotal: orderSubTotal,
                  total: orderTotal,
                  payment_method: payment_method,
                  payment_condition: payment_condition,
                  cc_brand: cc_brand,
                  cc_last_4_digits: cc_last_4_digits,
                  order_details: order_details
                });

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](0);

                if (!transaction) {
                  _context.next = 26;
                  break;
                }

                _context.next = 26;
                return transaction.rollback();

              case 26:
                throw new Error(_context.t0);

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 21]]);
      }));

      function run(_x) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return CreateOrderService;
}();

var _default = new CreateOrderService();

exports["default"] = _default;