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

var _Variacao = _interopRequireDefault(require("../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../models/Opcao"));

var ProductDetailsController = /*#__PURE__*/function () {
  function ProductDetailsController() {
    (0, _classCallCheck2["default"])(this, ProductDetailsController);
  }

  (0, _createClass2["default"])(ProductDetailsController, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var product;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Product["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId,
                    category_id: req.params.id
                  },
                  attributes: ['id', 'name', 'description', 'price', 'unit', 'quantity'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['id', 'path', 'url']
                  }, {
                    model: _Category["default"],
                    as: 'category',
                    attributes: ['id', 'name'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['id', 'path', 'url']
                    }]
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
                product = _context.sent;
                return _context.abrupt("return", res.json(product));

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
  return ProductDetailsController;
}();

var _default = new ProductDetailsController();

exports["default"] = _default;