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

var _Frete = _interopRequireDefault(require("../models/Frete"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

/* eslint-disable func-names */

/* eslint-disable no-unreachable */
var Fretes = /*#__PURE__*/function () {
  function Fretes() {
    (0, _classCallCheck2["default"])(this, Fretes);
  }

  (0, _createClass2["default"])(Fretes, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var frete, classFrete;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                frete = req.body.frete;
                classFrete = frete.map(function (item) {
                  return {
                    estabelecimento_id: req.estabelecimentoId,
                    name: item.name,
                    price: item.price,
                    status: item.status
                  };
                });

                _Frete["default"].bulkCreate(classFrete).then(function () {
                  return _Frete["default"].findAll();
                }).then(function (response) {
                  res.json(response);
                })["catch"](function (error) {
                  res.json(error);
                });

              case 3:
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
        var frete;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Frete["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId
                  },
                  order: [['id', 'DESC']],
                  attributes: ['id', 'name', 'price', 'status'],
                  include: [{
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja']
                  }]
                });

              case 2:
                frete = _context2.sent;
                return _context2.abrupt("return", res.json(frete));

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
        var frete, _yield$frete$update, price, status;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Frete["default"].findByPk(req.params.id);

              case 2:
                frete = _context3.sent;
                _context3.next = 5;
                return frete.update(req.body);

              case 5:
                _yield$frete$update = _context3.sent;
                price = _yield$frete$update.price;
                status = _yield$frete$update.status;
                return _context3.abrupt("return", res.json({
                  price: price,
                  status: status
                }));

              case 9:
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
                return _Frete["default"].destroy({
                  where: {
                    estabelecimento_id: req.estabelecimentoId
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
  return Fretes;
}();

var _default = new Fretes();

exports["default"] = _default;