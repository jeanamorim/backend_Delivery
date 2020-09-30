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

var _Order = _interopRequireDefault(require("../models/Order"));

var _OrderDetail = _interopRequireDefault(require("../models/OrderDetail"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _File = _interopRequireDefault(require("../models/File"));

var RelatorioPedidosControlersData = /*#__PURE__*/function () {
  function RelatorioPedidosControlersData() {
    (0, _classCallCheck2["default"])(this, RelatorioPedidosControlersData);
  }

  (0, _createClass2["default"])(RelatorioPedidosControlersData, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var date, parsedDate, order;
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
                  attributes: ['id', 'date', 'status', 'payment_method', 'ship_postal_code', 'ship_street', 'ship_street_n', 'ship_neighborhood', 'ship_city', 'ship_state', 'ship_complement', 'ship_reference', 'delivery_fee', 'discount', 'subtotal', 'total'],
                  include: [{
                    model: _OrderDetail["default"],
                    as: 'order_details',
                    attributes: ['quantity', 'price', 'total'],
                    include: [{
                      model: _Product["default"],
                      as: 'product',
                      attributes: ['name', 'description', 'price', 'quantity', 'unit'],
                      include: [{
                        model: _File["default"],
                        as: 'image',
                        attributes: ['path', 'url']
                      }]
                    }]
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja']
                  }],
                  order: ['date']
                });

              case 4:
                order = _context.sent;
                return _context.abrupt("return", res.json(order));

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
  return RelatorioPedidosControlersData;
}();

var _default = new RelatorioPedidosControlersData();

exports["default"] = _default;