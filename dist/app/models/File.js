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

var File = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(File, _Model);

  var _super = _createSuper(File);

  function File() {
    (0, _classCallCheck2["default"])(this, File);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(File, null, [{
    key: "init",
    value: function init(connection) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(File), "init", this).call(this, {
        name: _sequelize["default"].STRING,
        path: _sequelize["default"].STRING,
        size: _sequelize["default"].INTEGER,
        url: _sequelize["default"].STRING
      }, {
        sequelize: connection
      });
      return this;
    }
  }]);
  return File;
}(_sequelize.Model);

var _default = File;
exports["default"] = _default;