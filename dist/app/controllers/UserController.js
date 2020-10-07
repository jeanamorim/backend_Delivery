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

var _User = _interopRequireDefault(require("../models/User"));

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var userExists, _yield$User$create, id, name, last_name, email, phone, birthday, gender, cpf;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _User["default"].findOne({
                  where: {
                    email: req.body.email
                  }
                });

              case 2:
                userExists = _context.sent;

                if (!userExists) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: 'User already exists'
                }));

              case 5:
                _context.next = 7;
                return _User["default"].create(req.body);

              case 7:
                _yield$User$create = _context.sent;
                id = _yield$User$create.id;
                name = _yield$User$create.name;
                last_name = _yield$User$create.last_name;
                email = _yield$User$create.email;
                phone = _yield$User$create.phone;
                birthday = _yield$User$create.birthday;
                gender = _yield$User$create.gender;
                cpf = _yield$User$create.cpf;
                return _context.abrupt("return", res.json({
                  id: id,
                  name: name,
                  last_name: last_name,
                  email: email,
                  phone: phone,
                  birthday: birthday,
                  gender: gender,
                  cpf: cpf
                }));

              case 17:
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
  }, {
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var users;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _User["default"].findAll({
                  attributes: ['id', 'name', 'last_name', 'email', 'phone', 'birthday', 'gender', 'cpf']
                });

              case 2:
                users = _context2.sent;
                return _context2.abrupt("return", res.json(users));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function index(_x3, _x4) {
        return _index.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _req$body, email, oldPassword, user, userExists, _yield$user$update, id, name, last_name, phone, birthday, gender, cpf;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, oldPassword = _req$body.oldPassword;
                _context3.next = 3;
                return _User["default"].findByPk(req.body.user_id ? req.body.user_id : req.userId);

              case 3:
                user = _context3.sent;

                if (!(email !== user.email)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 7;
                return _User["default"].findOne({
                  where: {
                    email: email
                  }
                });

              case 7:
                userExists = _context3.sent;

                if (!userExists) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  error: 'User already exists'
                }));

              case 10:
                _context3.t0 = oldPassword;

                if (!_context3.t0) {
                  _context3.next = 15;
                  break;
                }

                _context3.next = 14;
                return user.checkPassword(oldPassword);

              case 14:
                _context3.t0 = !_context3.sent;

              case 15:
                if (!_context3.t0) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", res.status(401).json({
                  error: 'Password does not match'
                }));

              case 17:
                _context3.next = 19;
                return user.update(req.body);

              case 19:
                _yield$user$update = _context3.sent;
                id = _yield$user$update.id;
                name = _yield$user$update.name;
                last_name = _yield$user$update.last_name;
                phone = _yield$user$update.phone;
                birthday = _yield$user$update.birthday;
                gender = _yield$user$update.gender;
                cpf = _yield$user$update.cpf;
                return _context3.abrupt("return", res.json({
                  id: id,
                  name: name,
                  last_name: last_name,
                  email: email,
                  phone: phone,
                  birthday: birthday,
                  gender: gender,
                  cpf: cpf
                }));

              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return UserController;
}();

var _default = new UserController();

exports["default"] = _default;