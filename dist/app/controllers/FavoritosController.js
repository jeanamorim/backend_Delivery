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

var _User = _interopRequireDefault(require("../models/User"));

var _Favoritos = _interopRequireDefault(require("../models/Favoritos"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _File = _interopRequireDefault(require("../models/File"));

var FavoritosController = /*#__PURE__*/function () {
  function FavoritosController() {
    (0, _classCallCheck2["default"])(this, FavoritosController);
  }

  (0, _createClass2["default"])(FavoritosController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, user_id, estabelecimento_id, favoritos;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, user_id = _req$body.user_id, estabelecimento_id = _req$body.estabelecimento_id;
                _context.next = 3;
                return _Favoritos["default"].create({
                  estabelecimento_id: estabelecimento_id,
                  user_id: user_id
                });

              case 3:
                favoritos = _context.sent;
                return _context.abrupt("return", res.json(favoritos));

              case 5:
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
        var favoritos;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Favoritos["default"].findAll({
                  where: {
                    user_id: req.params.id
                  },
                  order: [['id', 'DESC']],
                  include: [{
                    model: _User["default"],
                    as: 'user',
                    attributes: ['id', 'name', 'phone']
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['name', 'path', 'url']
                    }]
                  }]
                });

              case 2:
                favoritos = _context2.sent;
                return _context2.abrupt("return", res.json(favoritos));

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
                return _Favoritos["default"].destroy({
                  where: {
                    estabelecimento_id: req.params.id
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
  return FavoritosController;
}();

var _default = new FavoritosController();

exports["default"] = _default;