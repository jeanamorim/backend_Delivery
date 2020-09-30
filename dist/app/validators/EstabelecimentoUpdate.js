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
              estabelecimento_id: Yup.number(),
              name: Yup.string(),
              name_loja: Yup.string(),
              status: Yup.string(),
              avaliacao: Yup.string(),
              categoria: Yup.string(),
              tempo_entrega: Yup.string(),
              email: Yup.string().email(),
              oldPassword: Yup.string(),
              password: Yup.string().when('oldPassword', function (oldPassword, field) {
                return oldPassword ? field.min(6).required() : field;
              }),
              passwordConfirmation: Yup.string().when('password', function (password, field) {
                return password ? field.required().oneOf([Yup.ref('password')]) : field;
              }),
              phone: Yup.string(),
              birthday: Yup.date(),
              gender: Yup.string().length(1),
              cpf: Yup.string().length(11)
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