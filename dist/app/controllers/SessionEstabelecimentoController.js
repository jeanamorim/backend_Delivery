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

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _File = _interopRequireDefault(require("../models/File"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _auth = _interopRequireDefault(require("../../config/auth"));

var SessionEstabelecimentoController = /*#__PURE__*/function () {
  function SessionEstabelecimentoController() {
    (0, _classCallCheck2["default"])(this, SessionEstabelecimentoController);
  }

  (0, _createClass2["default"])(SessionEstabelecimentoController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, password, user, checkPassword, id, name, name_loja, status, avaliacao, tempo_entrega, phone, birthday, gender, cpf, categoria, image;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context.next = 3;
                return _Estabelecimento["default"].findOne({
                  where: {
                    email: email
                  },
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['id', 'path', 'url']
                  }]
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  error: 'User not found'
                }));

              case 6:
                _context.next = 8;
                return user.checkPassword(password);

              case 8:
                checkPassword = _context.sent;

                if (checkPassword) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  error: 'Password does not match'
                }));

              case 11:
                id = user.id, name = user.name, name_loja = user.name_loja, status = user.status, avaliacao = user.avaliacao, tempo_entrega = user.tempo_entrega, phone = user.phone, birthday = user.birthday, gender = user.gender, cpf = user.cpf, categoria = user.categoria, image = user.image;
                return _context.abrupt("return", res.json({
                  user: {
                    id: id,
                    name: name,
                    name_loja: name_loja,
                    status: status,
                    avaliacao: avaliacao,
                    tempo_entrega: tempo_entrega,
                    email: email,
                    phone: phone,
                    birthday: birthday,
                    gender: gender,
                    cpf: cpf,
                    categoria: categoria,
                    image: image
                  },
                  token: _jsonwebtoken["default"].sign({
                    id: id
                  }, _auth["default"].secret, {
                    expiresIn: _auth["default"].expiresIn
                  })
                }));

              case 13:
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
  }]);
  return SessionEstabelecimentoController;
}();

var _default = new SessionEstabelecimentoController();

exports["default"] = _default;