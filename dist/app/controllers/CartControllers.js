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

var _Cart = _interopRequireDefault(require("../models/Cart"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _File = _interopRequireDefault(require("../models/File"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

// mport AdminCheckService from '../../services/AdminCheckService';
var Carrinho = /*#__PURE__*/function () {
  function Carrinho() {
    (0, _classCallCheck2["default"])(this, Carrinho);
  }

  (0, _createClass2["default"])(Carrinho, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, product_id, estabelecimento_id, user_id, observacao, quantidade, id;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // await AdminCheckService.run({ user_id: req.userId });
                _req$body = req.body, product_id = _req$body.product_id, estabelecimento_id = _req$body.estabelecimento_id, user_id = _req$body.user_id, observacao = _req$body.observacao, quantidade = _req$body.quantidade;
                _context.next = 3;
                return _Cart["default"].create({
                  estabelecimento_id: estabelecimento_id,
                  product_id: product_id,
                  user_id: user_id,
                  observacao: observacao,
                  quantidade: quantidade
                });

              case 3:
                id = _context.sent;
                return _context.abrupt("return", res.json(id));

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
        var count, _req$query$page, page, cart;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Cart["default"].findAndCountAll();

              case 2:
                count = _context2.sent;
                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
                _context2.next = 6;
                return _Cart["default"].findAll({
                  where: {
                    estabelecimento_id: req.params.id
                  },
                  limit: 30,
                  offset: (page - 1) * 30,
                  atributes: ['observacao', 'quantidade'],
                  include: [{
                    model: _Product["default"],
                    as: 'product',
                    attributes: ['id', 'name', 'description', 'price', 'unit', 'quantity'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['path', 'url']
                    }]
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['path', 'url']
                    }]
                  }]
                });

              case 6:
                cart = _context2.sent;
                res.header('X-Total-Count', count.count);
                return _context2.abrupt("return", res.json(cart));

              case 9:
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
        var cart, _yield$cart$update, product_id, estabelecimento_id, user_id, observacao, quantidade;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Cart["default"].findByPk(req.params.id);

              case 2:
                cart = _context3.sent;
                _context3.next = 5;
                return cart.update(req.body);

              case 5:
                _yield$cart$update = _context3.sent;
                product_id = _yield$cart$update.product_id;
                estabelecimento_id = _yield$cart$update.estabelecimento_id;
                user_id = _yield$cart$update.user_id;
                observacao = _yield$cart$update.observacao;
                quantidade = _yield$cart$update.quantidade;
                return _context3.abrupt("return", res.json({
                  product_id: product_id,
                  estabelecimento_id: estabelecimento_id,
                  user_id: user_id,
                  observacao: observacao,
                  quantidade: quantidade
                }));

              case 12:
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
                return _Cart["default"].destroy({
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
  return Carrinho;
}();

var _default = new Carrinho();

exports["default"] = _default;