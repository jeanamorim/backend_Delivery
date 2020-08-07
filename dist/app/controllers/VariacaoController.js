"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Variacao = _interopRequireDefault(require("../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../models/Opcao"));

// import AdminCheckService from '../../services/AdminCheckService';
var VariacaoController = /*#__PURE__*/function () {
  function VariacaoController() {
    (0, _classCallCheck2["default"])(this, VariacaoController);
  }

  (0, _createClass2["default"])(VariacaoController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, name, minimo, maximo, opcao, variacao;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // await AdminCheckService.run({ user_id: req.userId });
                _req$body = req.body, name = _req$body.name, minimo = _req$body.minimo, maximo = _req$body.maximo, opcao = _req$body.opcao;
                _context.next = 3;
                return _Variacao["default"].create({
                  name: name,
                  minimo: minimo,
                  maximo: maximo,
                  opcao: opcao
                });

              case 3:
                variacao = _context.sent;

                if (opcao && opcao.length > 0) {
                  variacao.setOpcao(opcao);
                }

                return _context.abrupt("return", res.json(variacao));

              case 6:
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
        var variacao;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Variacao["default"].findAll({
                  attributes: ['id', 'name', 'minimo', 'maximo'],
                  include: [{
                    model: _Opcao["default"],
                    as: 'opcao',
                    attributes: ['id', 'name', 'price', 'status'],
                    through: {
                      attributes: []
                    }
                  }]
                });

              case 2:
                variacao = _context2.sent;
                return _context2.abrupt("return", res.json(variacao));

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
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, post, _req$body2, opcao, data;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // await AdminCheckService.run({ user_id: req.userId });
                id = req.params.id;
                _context3.next = 3;
                return _Variacao["default"].findByPk(id);

              case 3:
                post = _context3.sent;
                _req$body2 = req.body, opcao = _req$body2.opcao, data = (0, _objectWithoutProperties2["default"])(_req$body2, ["opcao"]);
                post.update(data);

                if (opcao && opcao.length > 0) {
                  post.setOpcao(opcao);
                }

                return _context3.abrupt("return", res.json(post));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _Variacao["default"].destroy({
                  where: {
                    id: req.params.id
                  }
                });

              case 2:
                return _context4.abrupt("return", res.json());

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return VariacaoController;
}();

var _default = new VariacaoController();

exports["default"] = _default;