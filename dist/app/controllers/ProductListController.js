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

var _Product = _interopRequireDefault(require("../models/Product"));

var _File = _interopRequireDefault(require("../models/File"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _Variacao = _interopRequireDefault(require("../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../models/Opcao"));

var _FormatProductService = _interopRequireDefault(require("../../services/FormatProductService"));

var ProductListController = /*#__PURE__*/function () {
  function ProductListController() {
    (0, _classCallCheck2["default"])(this, ProductListController);
  }

  (0, _createClass2["default"])(ProductListController, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var products, productsFormatted;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Product["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId
                  },
                  order: [['id', 'DESC']],
                  attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
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
                    attributes: ['id', 'name', 'minimo', 'maximo'],
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
                });

              case 2:
                products = _context.sent;
                _context.next = 5;
                return _FormatProductService["default"].run(products);

              case 5:
                productsFormatted = _context.sent;
                return _context.abrupt("return", res.json(productsFormatted));

              case 7:
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
  return ProductListController;
}();

var _default = new ProductListController();

exports["default"] = _default;