"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _sequelize = _interopRequireWildcard(require("sequelize"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Address = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Address, _Model);

  var _super = _createSuper(Address);

  function Address() {
    (0, _classCallCheck2["default"])(this, Address);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Address, null, [{
    key: "init",
    value: function init(connection) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Address), "init", this).call(this, {
        postal_code: _sequelize["default"].STRING,
        street: _sequelize["default"].STRING,
        street_n: _sequelize["default"].STRING,
        neighborhood: _sequelize["default"].STRING,
        city: _sequelize["default"].STRING,
        state: _sequelize["default"].STRING,
        complement: _sequelize["default"].STRING,
        reference: _sequelize["default"].STRING
      }, {
        sequelize: connection,
        tableName: 'adresses'
      });
      return this;
    }
  }, {
    key: "associate",
    value: function associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }]);
  return Address;
}(_sequelize.Model);

var _default = Address;
exports["default"] = _default;