"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Yup = _interopRequireWildcard(require("yup"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var schema;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            schema = Yup.object().shape({
              user_id: Yup.number(),
              date: Yup.date(),
              status: Yup.string(),
              ship_postal_code: Yup.string().max(8),
              ship_street: Yup.string(),
              ship_street_n: Yup.number(),
              ship_neighborhood: Yup.string(),
              ship_city: Yup.string(),
              ship_state: Yup.string(),
              ship_complement: Yup.string(),
              ship_reference: Yup.string(),
              delivery_fee: Yup.number(),
              discount: Yup.number(),
              subtotal: Yup.number(),
              total: Yup.number(),
              products: Yup.array()
            });
            _context.next = 4;
            return schema.validate(req.body, {
              abortEarly: false
            });

          case 4:
            return _context.abrupt("return", next());

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(400).json({
              error: 'Validation fails',
              messages: _context.t0.inner
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;