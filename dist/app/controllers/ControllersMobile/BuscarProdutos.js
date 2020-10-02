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

var _sequelize = require("sequelize");

var _Estabelecimento = _interopRequireDefault(require("../../models/Estabelecimento"));

var _File = _interopRequireDefault(require("../../models/File"));

var _Product = _interopRequireDefault(require("../../models/Product"));

var _Category = _interopRequireDefault(require("../../models/Category"));

var _Variacao = _interopRequireDefault(require("../../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../../models/Opcao"));

var _FormatProductService = _interopRequireDefault(require("../../../services/FormatProductService"));

var BuscarProducts = /*#__PURE__*/function () {
  function BuscarProducts() {
    (0, _classCallCheck2["default"])(this, BuscarProducts);
  }

  (0, _createClass2["default"])(BuscarProducts, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var searchedProducts, productsFormatted;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.query) {
                  _context.next = 9;
                  break;
                }

                if (!req.query.search) {
                  _context.next = 9;
                  break;
                }

                _context.next = 4;
                return _Product["default"].findAll({
                  where: {
                    name: (0, _defineProperty2["default"])({
                      estabelecimento_id: req.params.id
                    }, _sequelize.Op.iLike, "%".concat(req.query.search, "%"))
                  },
                  order: [['id', 'DESC']],
                  attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['id', 'path', 'url']
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

              case 4:
                searchedProducts = _context.sent;
                _context.next = 7;
                return _FormatProductService["default"].run(searchedProducts);

              case 7:
                productsFormatted = _context.sent;
                return _context.abrupt("return", res.json(productsFormatted));

              case 9:
                return _context.abrupt("return", res.json());

              case 10:
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
  return BuscarProducts;
}();

var _default = new BuscarProducts();

exports["default"] = _default;