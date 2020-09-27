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
                return _context.abrupt("return", res.json(id));

              case 6:
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
        var count, offers, expiredCheck;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Offer["default"].findAndCountAll();

              case 2:
                count = _context2.sent;
                _context2.next = 5;
                return _Offer["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId
                  },
                  order: [['id', 'DESC']],
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
                    }]
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja']
                  }]
                });

              case 5:
                offers = _context2.sent;
                expiredCheck = JSON.parse(JSON.stringify(offers)).filter(function (offer) {
                  return !(0, _dateFns.isBefore)((0, _dateFns.parseISO)(offer.expiration_date), new Date());
                });
                res.header('X-Total-Count', count.count);
                return _context2.abrupt("return", res.json(expiredCheck));

              case 9:
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
                return _context3.abrupt("return", res.json({
                  id: id,
                  quantity: quantity,
                  unit: unit,
                  from: from,
                  to: to,
                  expiration_date: expiration_date
                }));

              case 13:
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
  return OfferController;
}();

var _default = new OfferController();

exports["default"] = _default;