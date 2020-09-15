"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var User = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(User, _Model);

  var _super = _createSuper(User);

  function User() {
    (0, _classCallCheck2["default"])(this, User);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(User, [{
    key: "checkPassword",
    value: function checkPassword(password) {
      return _bcryptjs["default"].compare(password, this.password_hash);
    }
  }], [{
    key: "init",
    value: function init(connection) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(User), "init", this).call(this, {
        name: _sequelize["default"].STRING,
        last_name: _sequelize["default"].STRING,
        email: _sequelize["default"].STRING,
        password: _sequelize["default"].VIRTUAL,
        password_hash: _sequelize["default"].STRING,
        phone: _sequelize["default"].STRING,
        birthday: _sequelize["default"].DATE,
        gender: _sequelize["default"].STRING,
        cpf: _sequelize["default"].STRING
      }, {
        sequelize: connection,
        tableName: 'users'
      });
      this.addHook('beforeSave', /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!user.password) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return _bcryptjs["default"].hash(user.password, 8);

                case 3:
                  user.password_hash = _context.sent;

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      return this;
    }
  }]);
  return User;
}(_sequelize.Model);

var _default = User;
exports["default"] = _default;