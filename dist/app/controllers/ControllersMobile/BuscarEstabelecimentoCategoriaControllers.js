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

var BuscarEstabelecimentoCategoriaControllers = /*#__PURE__*/function () {
  function BuscarEstabelecimentoCategoriaControllers() {
    (0, _classCallCheck2["default"])(this, BuscarEstabelecimentoCategoriaControllers);
  }

  (0, _createClass2["default"])(BuscarEstabelecimentoCategoriaControllers, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var product, _req$query$page, page, products, searchedProducts;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.params.id) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return _Estabelecimento["default"].findByPk(req.params.id, {
                  attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
                  }]
                });

              case 3:
                product = _context.sent;
                return _context.abrupt("return", res.json(product));

              case 5:
                if (!req.query) {
                  _context.next = 17;
                  break;
                }

                if (!req.query.category) {
                  _context.next = 12;
                  break;
                }

                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
                _context.next = 10;
                return _Estabelecimento["default"].findAll({
                  where: {
                    categoria: req.query.category
                  },
                  limit: 8,
                  offset: (page - 1) * 8,
                  attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
                  }]
                });

              case 10:
                products = _context.sent;
                return _context.abrupt("return", res.json(products));

              case 12:
                if (!req.query.search) {
                  _context.next = 17;
                  break;
                }

                _context.next = 15;
                return _Estabelecimento["default"].findAll({
                  where: {
                    name_loja: (0, _defineProperty2["default"])({}, _sequelize.Op.iLike, "%".concat(req.query.search, "%"))
                  },
                  attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
                  }]
                });

              case 15:
                searchedProducts = _context.sent;
                return _context.abrupt("return", res.json(searchedProducts));

              case 17:
                return _context.abrupt("return", res.json(''));

              case 18:
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
  return BuscarEstabelecimentoCategoriaControllers;
}();

var _default = new BuscarEstabelecimentoCategoriaControllers();

exports["default"] = _default;