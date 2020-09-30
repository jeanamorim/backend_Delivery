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

var ListCategoriaIds = /*#__PURE__*/function () {
  function ListCategoriaIds() {
    (0, _classCallCheck2["default"])(this, ListCategoriaIds);
  }

  (0, _createClass2["default"])(ListCategoriaIds, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var categoria;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Category["default"].findAll({
                  where: {
                    id: req.params.id
                  },
                  attributes: ['id', 'name'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
                  }]
                });

              case 2:
                categoria = _context.sent;
                return _context.abrupt("return", res.json(categoria));

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
  return ListCategoriaIds;
}();

var _default = new ListCategoriaIds();

exports["default"] = _default;