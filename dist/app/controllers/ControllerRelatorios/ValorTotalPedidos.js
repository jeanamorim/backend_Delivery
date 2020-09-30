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

var _dateFns = require("date-fns");

var _sequelize = require("sequelize");

var _Order = _interopRequireDefault(require("../../models/Order"));

var _database = _interopRequireDefault(require("../../../database"));

var Sequelize = _database["default"].connection; // import AdminCheckService from '../../services/AdminCheckService';

var ValorTotalPedidos = /*#__PURE__*/function () {
  function ValorTotalPedidos() {
    (0, _classCallCheck2["default"])(this, ValorTotalPedidos);
  }

  (0, _createClass2["default"])(ValorTotalPedidos, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var date, parsedDate, Valortotalpedidos;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = req.query.date;
                parsedDate = (0, _dateFns.parseISO)(date);
                _context.next = 4;
                return _Order["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId,
                    date: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [(0, _dateFns.startOfDay)(parsedDate), (0, _dateFns.endOfDay)(parsedDate)])
                  },
                  attributes: [[Sequelize.fn('sum', Sequelize.col('subtotal')), 'subtotal'], [Sequelize.fn('sum', Sequelize.col('delivery_fee')), 'delivery_fee']]
                });

              case 4:
                Valortotalpedidos = _context.sent;
                return _context.abrupt("return", res.json(Valortotalpedidos));

              case 6:
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
  return ValorTotalPedidos;
}();

var _default = new ValorTotalPedidos();

exports["default"] = _default;