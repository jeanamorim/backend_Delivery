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

var _Opcao = _interopRequireDefault(require("../../models/Opcao"));

var _Variacao = _interopRequireDefault(require("../../models/Variacao"));

var ListVariacaoId = /*#__PURE__*/function () {
  function ListVariacaoId() {
    (0, _classCallCheck2["default"])(this, ListVariacaoId);
  }

  (0, _createClass2["default"])(ListVariacaoId, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var variacao;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Variacao["default"].findAll({
                  where: {
                    id: req.params.id
                  },
                  attributes: ['id', 'name', 'minimo', 'maximo'],
                  include: [{
                    model: _Opcao["default"],
                    as: 'opcao',
                    attributes: ['id', 'name', 'price', 'status'],
                    through: {
                      attributes: []
                    }
                  }]
                });

              case 2:
                variacao = _context.sent;
                return _context.abrupt("return", res.json(variacao));

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
  return ListVariacaoId;
}();

var _default = new ListVariacaoId();

exports["default"] = _default;