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

var _Category = _interopRequireDefault(require("../../models/Category"));

var CategoriaestabelecimentoControllers = /*#__PURE__*/function () {
  function CategoriaestabelecimentoControllers() {
    (0, _classCallCheck2["default"])(this, CategoriaestabelecimentoControllers);
  }

  (0, _createClass2["default"])(CategoriaestabelecimentoControllers, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var count, _req$query$page, page, category;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Category["default"].findAndCountAll();

              case 2:
                count = _context.sent;
                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
                _context.next = 6;
                return _Category["default"].findAll({
                  where: {
                    estabelecimento_id: req.params.id
                  },
                  limit: 20,
                  offset: (page - 1) * 20,
                  attributes: ['id', 'name'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
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
  return CategoriaestabelecimentoControllers;
}();

var _default = new CategoriaestabelecimentoControllers();

exports["default"] = _default;