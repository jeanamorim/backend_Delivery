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

var _File = _interopRequireDefault(require("../../models/File"));

var _Product = _interopRequireDefault(require("../../models/Product"));

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
        var count, _req$query$page, page, category;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Product["default"].findAndCountAll();

              case 2:
                count = _context.sent;
                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
                _context.next = 6;
                return _Product["default"].findAll({
                  where: {
                    category_id: req.params.id
                  },
                  limit: 10,
                  offset: (page - 1) * 10,
                  attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['name', 'path', 'url']
                    }]
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
                });

              case 6:
                category = _context.sent;
                res.header('X-Total-Count', count.count);
                return _context.abrupt("return", res.json(category));

              case 9:
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