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

var OpcaoVariacaoEstabControllers = /*#__PURE__*/function () {
  function OpcaoVariacaoEstabControllers() {
    (0, _classCallCheck2["default"])(this, OpcaoVariacaoEstabControllers);
  }

  (0, _createClass2["default"])(OpcaoVariacaoEstabControllers, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var opcao;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Opcao["default"].findAll({
                  where: {
                    variacao_id: req.params.id
                  },
                  attributes: ['id', 'name', 'price', 'status'],
                  include: [{
                    model: _Variacao["default"],
                    as: 'variacao',
                    attributes: ['id', 'name', 'minimo', 'maximo', 'product_id']
                  }]
                });

              case 2:
                opcao = _context.sent;
                return _context.abrupt("return", res.json(opcao));

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
  return OpcaoVariacaoEstabControllers;
}();

var _default = new OpcaoVariacaoEstabControllers();

exports["default"] = _default;