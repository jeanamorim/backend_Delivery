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

var _OrderDetail = _interopRequireDefault(require("../../models/OrderDetail"));

var _Estabelecimento = _interopRequireDefault(require("../../models/Estabelecimento"));

var _Product = _interopRequireDefault(require("../../models/Product"));

var _File = _interopRequireDefault(require("../../models/File"));

var _User = _interopRequireDefault(require("../../models/User"));

var OrderController = /*#__PURE__*/function () {
  function OrderController() {
    (0, _classCallCheck2["default"])(this, OrderController);
  }

  (0, _createClass2["default"])(OrderController, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var orders;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Order["default"].findAll({
                  where: {
                    id: req.params.id
                  },
                  attributes: ['id', 'date', 'status', 'addressee', 'observacao', 'troco', 'payment_method', 'ship_postal_code', 'ship_street', 'ship_street_n', 'ship_neighborhood', 'ship_city', 'ship_state', 'ship_complement', 'ship_reference', 'delivery_fee', 'discount', 'subtotal', 'total'],
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
                    attributes: ['id', 'name_loja', 'phone'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['path', 'url']
                    }]
                  }, {
                    model: _User["default"],
                    as: 'user',
                    attributes: ['id', 'name', 'phone']
                  }]
                });

              case 2:
                orders = _context.sent;
                return _context.abrupt("return", res.json(orders));

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
  return OrderController;
}();

var _default = new OrderController();

exports["default"] = _default;