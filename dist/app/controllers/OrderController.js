"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dateFns = require("date-fns");

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../../database"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _OrderDetail = _interopRequireDefault(require("../models/OrderDetail"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _File = _interopRequireDefault(require("../models/File"));

var _User = _interopRequireDefault(require("../models/User"));

var _websocket = require("../../websocket");

var _CreateOrderService = _interopRequireDefault(require("../../services/CreateOrderService"));

var _CancelOrderService = _interopRequireDefault(require("../../services/CancelOrderService"));

// import AdminCheckService from '../../services/AdminCheckService';
var sequelize = _database["default"].connection;
var transaction;

var OrderController = /*#__PURE__*/function () {
  function OrderController() {
    (0, _classCallCheck2["default"])(this, OrderController);
  }

  (0, _createClass2["default"])(OrderController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var CreateOrder;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _CreateOrderService["default"].run(req.body);

              case 2:
                CreateOrder = _context.sent;
                return _context.abrupt("return", res.json(CreateOrder));

              case 4:
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
        var date, parsedDate, order, orders;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                date = req.query.date;
                parsedDate = (0, _dateFns.parseISO)(date);

                if (!(req.query.id && req.query.id > 0)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return _Order["default"].findByPk(req.query.id, {
                  attributes: ['id', 'date', 'status', 'addressee', 'observacao', 'troco', 'payment_method', 'ship_postal_code', 'ship_street', 'ship_street_n', 'ship_neighborhood', 'ship_city', 'ship_state', 'ship_complement', 'ship_reference', 'delivery_fee', 'discount', 'subtotal', 'total'],
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
                    attributes: ['id', 'name_loja', 'phone'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['path', 'url']
                    }]
                  }, {
                    model: _User["default"],
                    as: 'user',
                    attributes: ['id', 'name', 'phone']
                  }]
                });

              case 5:
                order = _context2.sent;
                return _context2.abrupt("return", res.json(order));

              case 7:
                _context2.next = 9;
                return _Order["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId,
                    date: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [(0, _dateFns.startOfDay)(parsedDate), (0, _dateFns.endOfDay)(parsedDate)])
                  },
                  attributes: ['id', 'date', 'status', 'addressee', 'observacao', 'troco', 'payment_method', 'ship_postal_code', 'ship_street', 'ship_street_n', 'ship_neighborhood', 'ship_city', 'ship_state', 'ship_complement', 'ship_reference', 'delivery_fee', 'discount', 'subtotal', 'total'],
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
                    attributes: ['id', 'name_loja', 'phone'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['path', 'url']
                    }]
                  }, {
                    model: _User["default"],
                    as: 'user',
                    attributes: ['id', 'name', 'phone']
                  }],
                  order: ['date']
                });

              case 9:
                orders = _context2.sent;
                return _context2.abrupt("return", res.json(orders));

              case 11:
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
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var order, _yield$order$update, id, date, user_id, estabelecimento_id, status, addressee, observacao, troco, ship_postal_code, ship_street, ship_street_n, ship_neighborhood, ship_city, ship_state, ship_complement, ship_reference, delivery_fee, discount, subtotal, total, payment_method, payment_condition, cc_brand, cc_last_4_digits, result, result1;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return sequelize.transaction();

              case 3:
                transaction = _context4.sent;
                _context4.next = 6;
                return _Order["default"].findByPk(req.params.id);

              case 6:
                order = _context4.sent;
                _context4.next = 9;
                return order.update(req.body, transaction);

              case 9:
                _yield$order$update = _context4.sent;
                id = _yield$order$update.id;
                date = _yield$order$update.date;
                user_id = _yield$order$update.user_id;
                estabelecimento_id = _yield$order$update.estabelecimento_id;
                status = _yield$order$update.status;
                addressee = _yield$order$update.addressee;
                observacao = _yield$order$update.observacao;
                troco = _yield$order$update.troco;
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
                  _context4.next = 41;
                  break;
                }

                req.body.products.map( /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(product) {
                    var orderDetail;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _OrderDetail["default"].findOne({
                              where: {
                                product_id: product.product_id,
                                order_id: id
                              }
                            });

                          case 2:
                            orderDetail = _context3.sent;
                            _context3.next = 5;
                            return orderDetail.update(product, transaction);

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x7) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context4.next = 38;
                return transaction.commit();

              case 38:
                result = {
                  id: id,
                  date: date,
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
                  subtotal: subtotal,
                  delivery_fee: delivery_fee,
                  discount: discount,
                  total: total,
                  payment_method: payment_method,
                  payment_condition: payment_condition,
                  cc_brand: cc_brand,
                  cc_last_4_digits: cc_last_4_digits,
                  products: req.body.products
                };
                (0, _websocket.sendMessage)(user_id, 'Update-order', result);
                return _context4.abrupt("return", res.json({
                  result: result
                }));

              case 41:
                _context4.next = 43;
                return transaction.commit();

              case 43:
                result1 = {
                  id: id,
                  date: date,
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
                  subtotal: subtotal,
                  delivery_fee: delivery_fee,
                  discount: discount,
                  total: total,
                  payment_method: payment_method,
                  payment_condition: payment_condition,
                  cc_brand: cc_brand,
                  cc_last_4_digits: cc_last_4_digits
                };
                (0, _websocket.sendMessage)(user_id, 'Update-order', result1);
                return _context4.abrupt("return", res.json({
                  result1: result1
                }));

              case 48:
                _context4.prev = 48;
                _context4.t0 = _context4["catch"](0);

                if (!transaction) {
                  _context4.next = 53;
                  break;
                }

                _context4.next = 53;
                return transaction.rollback();

              case 53:
                return _context4.abrupt("return", res.status(400).json({
                  error: _context4.t0
                }));

              case 54:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 48]]);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var CancelOrder;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _CancelOrderService["default"].run({
                  order_id: req.params.id
                });

              case 2:
                CancelOrder = _context5.sent;
                return _context5.abrupt("return", res.json(CancelOrder));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function _delete(_x8, _x9) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return OrderController;
}();

var _default = new OrderController();

exports["default"] = _default;