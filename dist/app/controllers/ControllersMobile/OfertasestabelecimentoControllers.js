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

var _File = _interopRequireDefault(require("../../models/File"));

var _Product = _interopRequireDefault(require("../../models/Product"));

var _Category = _interopRequireDefault(require("../../models/Category"));

var _Estabelecimento = _interopRequireDefault(require("../../models/Estabelecimento"));

var _Offer = _interopRequireDefault(require("../../models/Offer"));

var _Variacao = _interopRequireDefault(require("../../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../../models/Opcao"));

var _Cache = _interopRequireDefault(require("../../../lib/Cache"));

var OfertasestabelecimentoControllers = /*#__PURE__*/function () {
  function OfertasestabelecimentoControllers() {
    (0, _classCallCheck2["default"])(this, OfertasestabelecimentoControllers);
  }

  (0, _createClass2["default"])(OfertasestabelecimentoControllers, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var cached, _expiredCheck, _req$query$page, page, offers, expiredCheck;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Cache["default"].get("offers/".concat(req.estabelecimentoId));

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
                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
                _context.next = 9;
                return _Offer["default"].findAll({
                  where: {
                    estabelecimento_id: req.params.id
                  },
                  limit: 8,
                  offset: (page - 1) * 8,
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
                      attributes: ['id', 'name']
                    }, {
                      model: _Estabelecimento["default"],
                      as: 'estabelecimento',
                      attributes: ['id', 'name_loja']
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
                  }]
                });

              case 9:
                offers = _context.sent;
                expiredCheck = JSON.parse(JSON.stringify(offers)).filter(function (offer) {
                  return !(0, _dateFns.isBefore)((0, _dateFns.parseISO)(offer.expiration_date), new Date());
                });
                _context.next = 13;
                return _Cache["default"].set("offers/".concat(req.estabelecimentoId), expiredCheck);

              case 13:
                return _context.abrupt("return", res.json(expiredCheck));

              case 14:
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
  return OfertasestabelecimentoControllers;
}();

var _default = new OfertasestabelecimentoControllers();

exports["default"] = _default;