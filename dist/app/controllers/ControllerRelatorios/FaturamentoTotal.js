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

var _Order = _interopRequireDefault(require("../../models/Order"));

var _database = _interopRequireDefault(require("../../../database"));

var Sequelize = _database["default"].connection; // import AdminCheckService from '../../services/AdminCheckService';

var FaturamentoTotal = /*#__PURE__*/function () {
  function FaturamentoTotal() {
    (0, _classCallCheck2["default"])(this, FaturamentoTotal);
  }

  (0, _createClass2["default"])(FaturamentoTotal, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var faturamentoTotal;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Order["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId
                  },
                  attributes: [[Sequelize.fn('sum', Sequelize.col('subtotal')), 'subtotal']]
                });

              case 2:
                faturamentoTotal = _context.sent;
                return _context.abrupt("return", res.json(faturamentoTotal));

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
  return FaturamentoTotal;
}();

var _default = new FaturamentoTotal();

exports["default"] = _default;