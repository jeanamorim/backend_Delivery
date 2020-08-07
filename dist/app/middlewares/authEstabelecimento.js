"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _util = require("util");

var _auth = _interopRequireDefault(require("../../config/auth"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, _authHeader$split, _authHeader$split2, token, decoded;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authHeader = req.headers.authorization;

            if (authHeader) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: 'Token not provided'
            }));

          case 3:
            _authHeader$split = authHeader.split(' '), _authHeader$split2 = (0, _slicedToArray2["default"])(_authHeader$split, 2), token = _authHeader$split2[1];
            _context.prev = 4;
            _context.next = 7;
            return (0, _util.promisify)(_jsonwebtoken["default"].verify)(token, _auth["default"].secret);

          case 7:
            decoded = _context.sent;
            req.estabelecimentoId = decoded.id;
            return _context.abrupt("return", next());

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            return _context.abrupt("return", res.status(401).json({
              error: 'Invalid token'
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;