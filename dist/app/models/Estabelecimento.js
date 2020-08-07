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

var Estabelecimento = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Estabelecimento, _Model);

  var _super = _createSuper(Estabelecimento);

  function Estabelecimento() {
    (0, _classCallCheck2["default"])(this, Estabelecimento);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Estabelecimento, [{
    key: "checkPassword",
    value: function checkPassword(password) {
      return _bcryptjs["default"].compare(password, this.password_hash);
    }
  }], [{
    key: "init",
    value: function init(connection) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Estabelecimento), "init", this).call(this, {
        name: _sequelize["default"].STRING,
        name_loja: _sequelize["default"].STRING,
        status: _sequelize["default"].STRING,
        tempo_entrega: _sequelize["default"].STRING,
        avaliacao: _sequelize["default"].STRING,
        categoria: _sequelize["default"].STRING,
        email: _sequelize["default"].STRING,
        password: _sequelize["default"].VIRTUAL,
        password_hash: _sequelize["default"].STRING,
        phone: _sequelize["default"].STRING,
        birthday: _sequelize["default"].DATE,
        gender: _sequelize["default"].STRING,
        cpf: _sequelize["default"].STRING
      }, {
        sequelize: connection
      });
      this.addHook('beforeSave', /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(estabelecimento) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!estabelecimento.password) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return _bcryptjs["default"].hash(estabelecimento.password, 8);

                case 3:
                  estabelecimento.password_hash = _context.sent;

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
  }, {
    key: "associate",
    value: function associate(models) {
      this.belongsTo(models.File, {
        as: 'image',
        foreignKey: 'image_id'
      });
    }
  }]);
  return Estabelecimento;
}(_sequelize.Model);

var _default = Estabelecimento;
exports["default"] = _default;