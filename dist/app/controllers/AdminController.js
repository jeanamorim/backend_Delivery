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

var _Admin = _interopRequireDefault(require("../models/Admin"));

var _User = _interopRequireDefault(require("../models/User"));

var AdminController = /*#__PURE__*/function () {
  function AdminController() {
    (0, _classCallCheck2["default"])(this, AdminController);
  }

  (0, _createClass2["default"])(AdminController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var alreadyIsAdminCheck, _yield$Admin$create, id, user_id;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Admin["default"].findOne({
                  where: {
                    user_id: req.body.user_id
                  }
                });

              case 2:
                alreadyIsAdminCheck = _context.sent;

                if (!alreadyIsAdminCheck) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(401).json('User is already admin'));

              case 5:
                _context.next = 7;
                return _Admin["default"].create(req.body);

              case 7:
                _yield$Admin$create = _context.sent;
                id = _yield$Admin$create.id;
                user_id = _yield$Admin$create.user_id;
                return _context.abrupt("return", res.json({
                  id: id,
                  user_id: user_id
                }));

              case 11:
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
        var admins;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Admin["default"].findAll({
                  attributes: ['id'],
                  include: [{
                    model: _User["default"],
                    as: 'user',
                    attributes: ['id', 'name', 'last_name', 'email', 'phone', 'birthday', 'gender', 'cpf']
                  }]
                });

              case 2:
                admins = _context2.sent;
                return _context2.abrupt("return", res.json(admins));

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
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Admin["default"].destroy({
                  where: {
                    id: req.params.id
                  }
                });

              case 2:
                return _context3.abrupt("return", res.json());

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function _delete(_x5, _x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return AdminController;
}();

var _default = new AdminController();

exports["default"] = _default;