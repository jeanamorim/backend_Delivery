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

var OrderDetail = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(OrderDetail, _Model);

  var _super = _createSuper(OrderDetail);

  function OrderDetail() {
    (0, _classCallCheck2["default"])(this, OrderDetail);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(OrderDetail, null, [{
    key: "init",
    value: function init(connection) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(OrderDetail), "init", this).call(this, {
        quantity: _sequelize["default"].INTEGER,
        price: _sequelize["default"].FLOAT,
        total: _sequelize["default"].FLOAT
      }, {
        sequelize: connection,
        tableName: 'order_details'
      });
      return this;
    }
  }, {
    key: "associate",
    value: function associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
      this.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'product_id'
      });
    }
  }]);
  return OrderDetail;
}(_sequelize.Model);

var _default = OrderDetail;
exports["default"] = _default;