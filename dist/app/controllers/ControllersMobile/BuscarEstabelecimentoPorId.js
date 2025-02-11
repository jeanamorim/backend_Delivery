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

var _Estabelecimento = _interopRequireDefault(require("../../models/Estabelecimento"));

var _File = _interopRequireDefault(require("../../models/File"));

var BuscarEstabelecimentoPorId = /*#__PURE__*/function () {
  function BuscarEstabelecimentoPorId() {
    (0, _classCallCheck2["default"])(this, BuscarEstabelecimentoPorId);
  }

  (0, _createClass2["default"])(BuscarEstabelecimentoPorId, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var product;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Estabelecimento["default"].findAll({
                  where: {
                    id: req.params.id
                  },
                  attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
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
  return BuscarEstabelecimentoPorId;
}();

var _default = new BuscarEstabelecimentoPorId();

exports["default"] = _default;