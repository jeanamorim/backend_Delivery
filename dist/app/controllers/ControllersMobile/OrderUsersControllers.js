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

var _Order = _interopRequireDefault(require("../../models/Order"));

var _OrderDetail = _interopRequireDefault(require("../../models/OrderDetail"));

var _User = _interopRequireDefault(require("../../models/User"));

var _Estabelecimento = _interopRequireDefault(require("../../models/Estabelecimento"));

var _Product = _interopRequireDefault(require("../../models/Product"));

var OrderUsersControllers = /*#__PURE__*/function () {
  function OrderUsersControllers() {
    (0, _classCallCheck2["default"])(this, OrderUsersControllers);
  }

  (0, _createClass2["default"])(OrderUsersControllers, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$query$page, page, count, orders;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
                _context.next = 3;
                return _Order["default"].findAndCountAll();

              case 3:
                count = _context.sent;
                _context.next = 6;
                return _Order["default"].findAll({
                  order: [['date', 'DESC']],
                  limit: 15,
                  offset: (page - 1) * 15,
                  where: {
                    user_id: req.params.id
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
                    attributes: ['id', 'name_loja'],
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

              case 6:
                orders = _context.sent;
                res.header('X-Total-Count', count.count);
                return _context.abrupt("return", res.json(orders));

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
  return OrderUsersControllers;
}();

var _default = new OrderUsersControllers();

exports["default"] = _default;