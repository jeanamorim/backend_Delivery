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

var _Offer = _interopRequireDefault(require("../models/Offer"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _File = _interopRequireDefault(require("../models/File"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _Variacao = _interopRequireDefault(require("../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../models/Opcao"));

var _Cache = _interopRequireDefault(require("../../lib/Cache"));

var OfferController = /*#__PURE__*/function () {
  function OfferController() {
    (0, _classCallCheck2["default"])(this, OfferController);
  }

  (0, _createClass2["default"])(OfferController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, product_id, quantity, unit, from, to, expiration_date, id;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, product_id = _req$body.product_id, quantity = _req$body.quantity, unit = _req$body.unit, from = _req$body.from, to = _req$body.to;
                expiration_date = (0, _dateFns.addDays)(new Date(), req.body.expires_in);
                _context.next = 4;
                return _Offer["default"].create({
                  estabelecimento_id: req.estabelecimentoId,
                  product_id: product_id,
                  quantity: quantity,
                  unit: unit,
                  from: from,
                  to: to,
                  expiration_date: expiration_date
                });

              case 4:
                id = _context.sent;
                _context.next = 7;
                return _Cache["default"].invalidate("offers");

              case 7:
                _context.next = 9;
                return _Cache["default"].invalidate("products");

              case 9:
                return _context.abrupt("return", res.json(id));

              case 10:
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
        var cached, _expiredCheck, offers, expiredCheck;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Cache["default"].get("offers");

              case 2:
                cached = _context2.sent;

                if (!cached) {
                  _context2.next = 6;
                  break;
                }

                _expiredCheck = cached.filter(function (offer) {
                  return !(0, _dateFns.isBefore)((0, _dateFns.parseISO)(offer.expiration_date), new Date());
                });
                return _context2.abrupt("return", res.json(_expiredCheck));

              case 6:
                _context2.next = 8;
                return _Offer["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId
                  },
                  attributes: ['id', 'product_id', 'quantity', 'unit', 'from', 'to', 'expiration_date'],
                  include: [{
                    model: _Product["default"],
                    as: 'product',
                    attributes: ['id', 'name', 'description', 'price', 'unit', 'quantity'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['path', 'url']
                    }, {
                      model: _Category["default"],
                      as: 'category',
                      attributes: ['name']
                    }, {
                      model: _Variacao["default"],
                      as: 'variacao',
                      attributes: ['name', 'minimo', 'maximo'],
                      through: {
                        attributes: []
                      },
                      include: [{
                        model: _Opcao["default"],
                        as: 'opcao',
                        attributes: ['id', 'name', 'price', 'status'],
                        through: {
                          attributes: []
                        }
                      }]
                    }]
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['name', 'path', 'url']
                    }]
                  }]
                });

              case 8:
                offers = _context2.sent;
                expiredCheck = JSON.parse(JSON.stringify(offers)).filter(function (offer) {
                  return !(0, _dateFns.isBefore)((0, _dateFns.parseISO)(offer.expiration_date), new Date());
                });
                _context2.next = 12;
                return _Cache["default"].set("offers", expiredCheck);

              case 12:
                return _context2.abrupt("return", res.json(expiredCheck));

              case 13:
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
        var offer, _yield$offer$update, id, expiration_date, quantity, unit, from, to;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Offer["default"].findByPk(req.params.id);

              case 2:
                offer = _context3.sent;
                _context3.next = 5;
                return offer.update(req.body);

              case 5:
                _yield$offer$update = _context3.sent;
                id = _yield$offer$update.id;
                expiration_date = _yield$offer$update.expiration_date;
                quantity = _yield$offer$update.quantity;
                unit = _yield$offer$update.unit;
                from = _yield$offer$update.from;
                to = _yield$offer$update.to;
                _context3.next = 14;
                return _Cache["default"].invalidate("offers");

              case 14:
                _context3.next = 16;
                return _Cache["default"].invalidate("products");

              case 16:
                return _context3.abrupt("return", res.json({
                  id: id,
                  quantity: quantity,
                  unit: unit,
                  from: from,
                  to: to,
                  expiration_date: expiration_date
                }));

              case 17:
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
                return _Offer["default"].destroy({
                  where: {
                    id: req.params.id
                  }
                });

              case 2:
                _context4.next = 4;
                return _Cache["default"].invalidate("offers");

              case 4:
                return _context4.abrupt("return", res.json());

              case 5:
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
  return OfferController;
}();

var _default = new OfferController();

exports["default"] = _default;