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

var _Offer = _interopRequireDefault(require("../../models/Offer"));

var _Product = _interopRequireDefault(require("../../models/Product"));

var _File = _interopRequireDefault(require("../../models/File"));

var _Category = _interopRequireDefault(require("../../models/Category"));

var _Estabelecimento = _interopRequireDefault(require("../../models/Estabelecimento"));

var _Variacao = _interopRequireDefault(require("../../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../../models/Opcao"));

var _Cache = _interopRequireDefault(require("../../../lib/Cache"));

var OfertasGeral = /*#__PURE__*/function () {
  function OfertasGeral() {
    (0, _classCallCheck2["default"])(this, OfertasGeral);
  }

  (0, _createClass2["default"])(OfertasGeral, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var cached, _expiredCheck, offers, expiredCheck;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Cache["default"].get("offers");

              case 2:
                cached = _context.sent;

                if (!cached) {
                  _context.next = 6;
                  break;
                }

                _expiredCheck = cached.filter(function (offer) {
                  return !(0, _dateFns.isBefore)((0, _dateFns.parseISO)(offer.expiration_date), new Date());
                });
                return _context.abrupt("return", res.json(_expiredCheck));

              case 6:
                _context.next = 8;
                return _Offer["default"].findAll({
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
                offers = _context.sent;
                expiredCheck = JSON.parse(JSON.stringify(offers)).filter(function (offer) {
                  return !(0, _dateFns.isBefore)((0, _dateFns.parseISO)(offer.expiration_date), new Date());
                });
                _context.next = 12;
                return _Cache["default"].set("offers", expiredCheck);

              case 12:
                return _context.abrupt("return", res.json(expiredCheck));

              case 13:
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
  }]);
  return OfertasGeral;
}();

var _default = new OfertasGeral();

exports["default"] = _default;