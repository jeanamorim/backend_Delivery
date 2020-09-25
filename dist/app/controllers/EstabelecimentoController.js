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

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _File = _interopRequireDefault(require("../models/File"));

// import AdminCheckService from '../../services/AdminCheckService';
var EstabelecimentoController = /*#__PURE__*/function () {
  function EstabelecimentoController() {
    (0, _classCallCheck2["default"])(this, EstabelecimentoController);
  }

  (0, _createClass2["default"])(EstabelecimentoController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var userExists, _yield$Estabeleciment, id, name, name_loja, status, avaliacao, categoria, tempo_entrega, email, phone, birthday, gender, cpf, image_id;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Estabelecimento["default"].findOne({
                  where: {
                    email: req.body.email
                  }
                });

              case 2:
                userExists = _context.sent;

                if (!userExists) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: 'User already exists'
                }));

              case 5:
                _context.next = 7;
                return _Estabelecimento["default"].create(req.body);

              case 7:
                _yield$Estabeleciment = _context.sent;
                id = _yield$Estabeleciment.id;
                name = _yield$Estabeleciment.name;
                name_loja = _yield$Estabeleciment.name_loja;
                status = _yield$Estabeleciment.status;
                avaliacao = _yield$Estabeleciment.avaliacao;
                categoria = _yield$Estabeleciment.categoria;
                tempo_entrega = _yield$Estabeleciment.tempo_entrega;
                email = _yield$Estabeleciment.email;
                phone = _yield$Estabeleciment.phone;
                birthday = _yield$Estabeleciment.birthday;
                gender = _yield$Estabeleciment.gender;
                cpf = _yield$Estabeleciment.cpf;
                image_id = _yield$Estabeleciment.image_id;
                return _context.abrupt("return", res.json({
                  id: id,
                  name: name,
                  name_loja: name_loja,
                  status: status,
                  avaliacao: avaliacao,
                  categoria: categoria,
                  tempo_entrega: tempo_entrega,
                  email: email,
                  phone: phone,
                  birthday: birthday,
                  gender: gender,
                  cpf: cpf,
                  image_id: image_id
                }));

              case 22:
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
        var count, _req$query$page, page, estabelecimento;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Estabelecimento["default"].findAndCountAll();

              case 2:
                count = _context2.sent;
                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
                _context2.next = 6;
                return _Estabelecimento["default"].findAll({
                  order: [['status']],
                  limit: 15,
                  offset: (page - 1) * 15,
                  attributes: ['id', 'name', 'name_loja', 'status', 'avaliacao', 'categoria', 'tempo_entrega', 'email', 'phone', 'birthday', 'gender', 'cpf'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['name', 'path', 'url']
                  }]
                });

              case 6:
                estabelecimento = _context2.sent;
                // await Cache.set('estabelecimento', estabelecimento);
                res.header('X-Total-Count', count.count);
                return _context2.abrupt("return", res.json(estabelecimento));

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
        var cart, _yield$cart$update, status;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Estabelecimento["default"].findByPk(req.params.id);

              case 2:
                cart = _context3.sent;
                _context3.next = 5;
                return cart.update(req.body);

              case 5:
                _yield$cart$update = _context3.sent;
                status = _yield$cart$update.status;
                return _context3.abrupt("return", res.json({
                  status: status
                }));

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
  }]);
  return EstabelecimentoController;
}(); // ok adicionando


var _default = new EstabelecimentoController();

exports["default"] = _default;