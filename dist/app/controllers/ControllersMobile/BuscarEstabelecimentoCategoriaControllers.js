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

var _Cache = _interopRequireDefault(require("../../../lib/Cache"));

var BuscarEstabelecimentoCategoriaControllers = /*#__PURE__*/function () {
  function BuscarEstabelecimentoCategoriaControllers() {
    (0, _classCallCheck2["default"])(this, BuscarEstabelecimentoCategoriaControllers);
  }

  (0, _createClass2["default"])(BuscarEstabelecimentoCategoriaControllers, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var estabelecimento, cached, searchedProducts, _cached;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.query) {
                  _context.next = 25;
                  break;
                }

                if (!req.query.category) {
                  _context.next = 13;
                  break;
                }

                _context.next = 4;
                return _Estabelecimento["default"].findAll({
                  where: {
                    categoria: req.query.category
                  },
                  attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
                  }]
                });

              case 4:
                estabelecimento = _context.sent;
                _context.next = 7;
                return _Cache["default"].get("estabelecimento");

              case 7:
                cached = _context.sent;

                if (!cached) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.json(cached));

              case 10:
                _context.next = 12;
                return _Cache["default"].set("estabelecimento", estabelecimento);

              case 12:
                return _context.abrupt("return", res.json(estabelecimento));

              case 13:
                if (!req.query.search) {
                  _context.next = 25;
                  break;
                }

                _context.next = 16;
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

              case 16:
                searchedProducts = _context.sent;
                _context.next = 19;
                return _Cache["default"].get("estabelecimento");

              case 19:
                _cached = _context.sent;

                if (!_cached) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", res.json(_cached));

              case 22:
                _context.next = 24;
                return _Cache["default"].set("estabelecimento", searchedProducts);

              case 24:
                return _context.abrupt("return", res.json(searchedProducts));

              case 25:
                return _context.abrupt("return", res.json(''));

              case 26:
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