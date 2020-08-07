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

var _Cart = _interopRequireDefault(require("../../models/Cart"));

// mport AdminCheckService from '../../services/AdminCheckService';
var Carrinho = /*#__PURE__*/function () {
  function Carrinho() {
    (0, _classCallCheck2["default"])(this, Carrinho);
  }

  (0, _createClass2["default"])(Carrinho, [{
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Cart["default"].destroy({
                  where: {
                    estabelecimento_id: req.params.id
                  }
                });

              case 2:
                return _context.abrupt("return", res.json());

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function _delete(_x, _x2) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return Carrinho;
}();

var _default = new Carrinho();

exports["default"] = _default;