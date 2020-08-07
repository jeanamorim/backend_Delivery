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

var Order = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Order, _Model);

  var _super = _createSuper(Order);

  function Order() {
    (0, _classCallCheck2["default"])(this, Order);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Order, null, [{
    key: "init",
    value: function init(connection) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Order), "init", this).call(this, {
        date: _sequelize["default"].DATE,
        status: _sequelize["default"].STRING,
        addressee: _sequelize["default"].STRING,
        observacao: _sequelize["default"].STRING,
        troco: _sequelize["default"].STRING,
        ship_postal_code: _sequelize["default"].STRING,
        ship_street: _sequelize["default"].STRING,
        ship_street_n: _sequelize["default"].INTEGER,
        ship_neighborhood: _sequelize["default"].STRING,
        ship_city: _sequelize["default"].STRING,
        ship_state: _sequelize["default"].STRING,
        ship_complement: _sequelize["default"].STRING,
        ship_reference: _sequelize["default"].STRING,
        delivery_fee: _sequelize["default"].FLOAT,
        discount: _sequelize["default"].FLOAT,
        subtotal: _sequelize["default"].FLOAT,
        total: _sequelize["default"].FLOAT,
        payment_method: _sequelize["default"].STRING,
        payment_condition: _sequelize["default"].INTEGER,
        cc_brand: _sequelize["default"].STRING,
        cc_last_4_digits: _sequelize["default"].STRING,
        canceled_at: _sequelize["default"].DATE
      }, {
        sequelize: connection
      });
      return this;
    }
  }, {
    key: "associate",
    value: function associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      this.belongsTo(models.Estabelecimento, {
        foreignKey: 'estabelecimento_id',
        as: 'estabelecimento'
      });
      this.hasMany(models.OrderDetail, {
        as: 'order_details'
      });
    }
  }]);
  return Order;
}(_sequelize.Model);

var _default = Order;
exports["default"] = _default;