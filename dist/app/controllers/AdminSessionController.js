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

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _auth = _interopRequireDefault(require("../../config/auth"));

// import AdminCheckService from '../../services/AdminCheckService';
var SessionController = /*#__PURE__*/function () {
  function SessionController() {
    (0, _classCallCheck2["default"])(this, SessionController);
  }

  (0, _createClass2["default"])(SessionController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, password, user, checkPassword, id, name, last_name, phone, birthday, gender, cpf;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context.next = 3;
                return _User["default"].findOne({
                  where: {
                    email: email
                  }
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  error: 'User not found'
                }));

              case 6:
                _context.next = 8;
                return user.checkPassword(password);

              case 8:
                checkPassword = _context.sent;

                if (checkPassword) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  error: 'Password does not match'
                }));

              case 11:
                id = user.id, name = user.name, last_name = user.last_name, phone = user.phone, birthday = user.birthday, gender = user.gender, cpf = user.cpf; // await AdminCheckService.run({ user_id: id });

                return _context.abrupt("return", res.json({
                  user: {
                    id: id,
                    name: name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    birthday: birthday,
                    gender: gender,
                    cpf: cpf
                  },
                  token: _jsonwebtoken["default"].sign({
                    id: id
                  }, _auth["default"].secret, {
                    expiresIn: _auth["default"].expiresIn
                  })
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function store(_x, _x2) {
        return _store.apply(this, arguments);
      }

      return store;
    }()
  }]);
  return SessionController;
}();

var _default = new SessionController();

exports["default"] = _default;