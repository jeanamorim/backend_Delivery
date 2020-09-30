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

var _database = _interopRequireDefault(require("../../../database"));

var _Order = _interopRequireDefault(require("../../models/Order"));

var _OrderDetail = _interopRequireDefault(require("../../models/OrderDetail"));

var _User = _interopRequireDefault(require("../../models/User"));

var _Product = _interopRequireDefault(require("../../models/Product"));

var _Estabelecimento = _interopRequireDefault(require("../../models/Estabelecimento"));

var _File = _interopRequireDefault(require("../../models/File"));

var _CancelOrderService = _interopRequireDefault(require("../../../services/CancelOrderService"));

var _AdminCheckService = _interopRequireDefault(require("../../../services/AdminCheckService"));

var sequelize = _database["default"].connection;
var transaction;

var OrderController = /*#__PURE__*/function () {
  function OrderController() {
    (0, _classCallCheck2["default"])(this, OrderController);
  }

  (0, _createClass2["default"])(OrderController, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var order, orders;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(req.query.id && req.query.id > 0)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return _Order["default"].findByPk(req.query.id, {
                  attributes: ['id', 'date', 'status', 'payment_method', 'ship_postal_code', 'ship_street', 'ship_street_n', 'ship_neighborhood', 'ship_city', 'ship_state', 'ship_complement', 'ship_reference', 'delivery_fee', 'discount', 'subtotal', 'total'],
                  include: [{
                    model: _OrderDetail["default"],
                    as: 'order_details',
                    attributes: ['quantity', 'price', 'total'],
                    include: [{
                      model: _Product["default"],
                      as: 'product',
                      attributes: ['name', 'description', 'price', 'quantity', 'unit'],
                      include: [{
                        model: _File["default"],
                        as: 'image',
                        attributes: ['path', 'url']
                      }]
                    }]
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja', 'phone']
                  }, {
                    model: _User["default"],
                    as: 'user',
                    attributes: ['id', 'name', 'phone']
                  }]
                });

              case 3:
                order = _context.sent;
                return _context.abrupt("return", res.json(order));

              case 5:
                _context.next = 7;
                return _Order["default"].findAll({
                  attributes: ['id', 'date', 'status', 'payment_method', 'ship_postal_code', 'ship_street', 'ship_street_n', 'ship_neighborhood', 'ship_city', 'ship_state', 'ship_complement', 'ship_reference', 'delivery_fee', 'discount', 'subtotal', 'total'],
                  include: [{
                    model: _OrderDetail["default"],
                    as: 'order_details',
                    attributes: ['quantity', 'price', 'total'],
                    include: [{
                      model: _Product["default"],
                      as: 'product',
                      attributes: ['name', 'description', 'price', 'quantity', 'unit'],
                      include: [{
                        model: _File["default"],
                        as: 'image',
                        attributes: ['path', 'url']
                      }]
                    }]
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja', 'phone']
                  }, {
                    model: _User["default"],
                    as: 'user',
                    attributes: ['id', 'name', 'phone']
                  }]
                });

              case 7:
                orders = _context.sent;
                return _context.abrupt("return", res.json(orders));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function index(_x, _x2) {
        return _index.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var order, _yield$order$update, id, date, user_id, status, name, ship_postal_code, ship_street, ship_street_n, ship_neighborhood, ship_city, ship_state, ship_complement, ship_reference, delivery_fee, discount, subtotal, total, payment_method, payment_condition, cc_brand, cc_last_4_digits;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _AdminCheckService["default"].run({
                  user_id: req.userId
                });

              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return sequelize.transaction();

              case 5:
                transaction = _context3.sent;
                _context3.next = 8;
                return _Order["default"].findByPk(req.params.id);

              case 8:
                order = _context3.sent;
                _context3.next = 11;
                return order.update(req.body, transaction);

              case 11:
                _yield$order$update = _context3.sent;
                id = _yield$order$update.id;
                date = _yield$order$update.date;
                user_id = _yield$order$update.user_id;
                status = _yield$order$update.status;
                name = _yield$order$update.name;
                ship_postal_code = _yield$order$update.ship_postal_code;
                ship_street = _yield$order$update.ship_street;
                ship_street_n = _yield$order$update.ship_street_n;
                ship_neighborhood = _yield$order$update.ship_neighborhood;
                ship_city = _yield$order$update.ship_city;
                ship_state = _yield$order$update.ship_state;
                ship_complement = _yield$order$update.ship_complement;
                ship_reference = _yield$order$update.ship_reference;
                delivery_fee = _yield$order$update.delivery_fee;
                discount = _yield$order$update.discount;
                subtotal = _yield$order$update.subtotal;
                total = _yield$order$update.total;
                payment_method = _yield$order$update.payment_method;
                payment_condition = _yield$order$update.payment_condition;
                cc_brand = _yield$order$update.cc_brand;
                cc_last_4_digits = _yield$order$update.cc_last_4_digits;

                if (!req.body.products) {
                  _context3.next = 38;
                  break;
                }

                req.body.products.map( /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(product) {
                    var orderDetail;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return _OrderDetail["default"].findOne({
                              where: {
                                product_id: product.product_id,
                                order_id: id
                              }
                            });

                          case 2:
                            orderDetail = _context2.sent;
                            _context2.next = 5;
                            return orderDetail.update(product, transaction);

                          case 5:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x5) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context3.next = 37;
                return transaction.commit();

              case 37:
                return _context3.abrupt("return", res.json({
                  id: id,
                  date: date,
                  user_id: user_id,
                  status: status,
                  name: name,
                  ship_postal_code: ship_postal_code,
                  ship_street: ship_street,
                  ship_street_n: ship_street_n,
                  ship_neighborhood: ship_neighborhood,
                  ship_city: ship_city,
                  ship_state: ship_state,
                  ship_complement: ship_complement,
                  ship_reference: ship_reference,
                  subtotal: subtotal,
                  delivery_fee: delivery_fee,
                  discount: discount,
                  total: total,
                  payment_method: payment_method,
                  payment_condition: payment_condition,
                  cc_brand: cc_brand,
                  cc_last_4_digits: cc_last_4_digits,
                  products: req.body.products
                }));

              case 38:
                _context3.next = 40;
                return transaction.commit();

              case 40:
                return _context3.abrupt("return", res.json({
                  id: id,
                  date: date,
                  user_id: user_id,
                  status: status,
                  name: name,
                  ship_postal_code: ship_postal_code,
                  ship_street: ship_street,
                  ship_street_n: ship_street_n,
                  ship_neighborhood: ship_neighborhood,
                  ship_city: ship_city,
                  ship_state: ship_state,
                  ship_complement: ship_complement,
                  ship_reference: ship_reference,
                  subtotal: subtotal,
                  delivery_fee: delivery_fee,
                  discount: discount,
                  total: total,
                  payment_method: payment_method,
                  payment_condition: payment_condition,
                  cc_brand: cc_brand,
                  cc_last_4_digits: cc_last_4_digits
                }));

              case 43:
                _context3.prev = 43;
                _context3.t0 = _context3["catch"](2);

                if (!transaction) {
                  _context3.next = 48;
                  break;
                }

                _context3.next = 48;
                return transaction.rollback();

              case 48:
                return _context3.abrupt("return", res.status(400).json({
                  error: _context3.t0
                }));

              case 49:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 43]]);
      }));

      function update(_x3, _x4) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var CancelOrder;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _AdminCheckService["default"].run({
                  user_id: req.userId
                });

              case 2:
                _context4.next = 4;
                return _CancelOrderService["default"].run({
                  order_id: req.params.id
                });

              case 4:
                CancelOrder = _context4.sent;
                return _context4.abrupt("return", res.json(CancelOrder));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function _delete(_x6, _x7) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return OrderController;
}();

var _default = new OrderController();

exports["default"] = _default;