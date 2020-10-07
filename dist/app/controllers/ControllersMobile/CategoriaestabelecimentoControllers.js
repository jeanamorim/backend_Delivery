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

var _Cache = _interopRequireDefault(require("../../../lib/Cache"));

var _Category = _interopRequireDefault(require("../../models/Category"));

var CategoriaestabelecimentoControllers = /*#__PURE__*/function () {
  function CategoriaestabelecimentoControllers() {
    (0, _classCallCheck2["default"])(this, CategoriaestabelecimentoControllers);
  }

  (0, _createClass2["default"])(CategoriaestabelecimentoControllers, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var category, cached;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Category["default"].findAll({
                  where: {
                    estabelecimento_id: req.params.id
                  },
                  attributes: ['id', 'name'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
                  }]
                });

              case 2:
                category = _context.sent;
                _context.next = 5;
                return _Cache["default"].get("categories");

              case 5:
                cached = _context.sent;

                if (!cached) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.json(cached));

              case 8:
                _context.next = 10;
                return _Cache["default"].set("categories", category);

              case 10:
                return _context.abrupt("return", res.json(category));

              case 11:
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
  return CategoriaestabelecimentoControllers;
}();

var _default = new CategoriaestabelecimentoControllers();

exports["default"] = _default;