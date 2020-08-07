"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _User = _interopRequireDefault(require("../app/models/User"));

var _Admin = _interopRequireDefault(require("../app/models/Admin"));

var _Address = _interopRequireDefault(require("../app/models/Address"));

var _File = _interopRequireDefault(require("../app/models/File"));

var _Banner = _interopRequireDefault(require("../app/models/Banner"));

var _Category = _interopRequireDefault(require("../app/models/Category"));

var _Product = _interopRequireDefault(require("../app/models/Product"));

var _Order = _interopRequireDefault(require("../app/models/Order"));

var _OrderDetail = _interopRequireDefault(require("../app/models/OrderDetail"));

var _Offer = _interopRequireDefault(require("../app/models/Offer"));

var _Setting = _interopRequireDefault(require("../app/models/Setting"));

var _Estabelecimento = _interopRequireDefault(require("../app/models/Estabelecimento"));

var _Variacao = _interopRequireDefault(require("../app/models/Variacao"));

var _Frete = _interopRequireDefault(require("../app/models/Frete"));

var _Opcao = _interopRequireDefault(require("../app/models/Opcao"));

var _Cart = _interopRequireDefault(require("../app/models/Cart"));

var _Schedule = _interopRequireDefault(require("../app/models/Schedule"));

var _database = _interopRequireDefault(require("../config/database"));

var models = [_User["default"], _Admin["default"], _Address["default"], _File["default"], _Banner["default"], _Category["default"], _Product["default"], _Order["default"], _OrderDetail["default"], _Offer["default"], _Setting["default"], _Estabelecimento["default"], _Variacao["default"], _Frete["default"], _Opcao["default"], _Cart["default"], _Schedule["default"]];

var Database = /*#__PURE__*/function () {
  function Database() {
    (0, _classCallCheck2["default"])(this, Database);
    this.init();
  }

  (0, _createClass2["default"])(Database, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.connection = new _sequelize["default"](_database["default"]);
      models.map(function (model) {
        return model.init(_this.connection);
      }).map(function (model) {
        return model.associate && model.associate(_this.connection.models);
      });
    }
  }]);
  return Database;
}();

var _default = new Database();

exports["default"] = _default;