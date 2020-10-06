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

var _Offer = _interopRequireDefault(require("../../models/Offer"));

var _Product = _interopRequireDefault(require("../../models/Product"));

var _File = _interopRequireDefault(require("../../models/File"));

var _Category = _interopRequireDefault(require("../../models/Category"));

var _Estabelecimento = _interopRequireDefault(require("../../models/Estabelecimento"));

var _Variacao = _interopRequireDefault(require("../../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../../models/Opcao"));

var ProductEstabelecimentoController = /*#__PURE__*/function () {
  function ProductEstabelecimentoController() {
    (0, _classCallCheck2["default"])(this, ProductEstabelecimentoController);
  }

  (0, _createClass2["default"])(ProductEstabelecimentoController, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var offers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
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

              case 2:
                offers = _context.sent;
                return _context.abrupt("return", res.json(offers));

              case 4:
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
  return ProductEstabelecimentoController;
}();

var _default = new ProductEstabelecimentoController();

exports["default"] = _default;