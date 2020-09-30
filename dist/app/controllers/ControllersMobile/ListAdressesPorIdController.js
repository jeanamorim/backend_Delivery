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

var _Address = _interopRequireDefault(require("../../models/Address"));

var AdressesUserLogadoController = /*#__PURE__*/function () {
  function AdressesUserLogadoController() {
    (0, _classCallCheck2["default"])(this, AdressesUserLogadoController);
  }

  (0, _createClass2["default"])(AdressesUserLogadoController, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var endereco;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Address["default"].findAll({
                  where: {
                    id: req.params.id
                  },
                  attributes: ['id', 'user_id', 'postal_code', 'street', 'street_n', 'neighborhood', 'city', 'state', 'complement', 'reference']
                });

              case 2:
                endereco = _context.sent;
                return _context.abrupt("return", res.json(endereco));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function index(_x, _x2) {
        return _index.apply(this, arguments);
      }

      return index;
    }()
  }]);
  return AdressesUserLogadoController;
}();

var _default = new AdressesUserLogadoController();

exports["default"] = _default;