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
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, user_id, postal_code, street, street_n, neighborhood, city, state, complement, reference, endereco;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, user_id = _req$body.user_id, postal_code = _req$body.postal_code, street = _req$body.street, street_n = _req$body.street_n, neighborhood = _req$body.neighborhood, city = _req$body.city, state = _req$body.state, complement = _req$body.complement, reference = _req$body.reference;
                _context.next = 3;
                return _Address["default"].create({
                  user_id: user_id,
                  postal_code: postal_code,
                  street: street,
                  street_n: street_n,
                  neighborhood: neighborhood,
                  city: city,
                  state: state,
                  complement: complement,
                  reference: reference
                });

              case 3:
                endereco = _context.sent;
                return _context.abrupt("return", res.json(endereco));

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
        var _req$query$page, page, endereco;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
                _context2.next = 3;
                return _Address["default"].findAll({
                  where: {
                    user_id: req.params.id
                  },
                  limit: 10,
                  offset: (page - 1) * 10,
                  attributes: ['id', 'user_id', 'postal_code', 'street', 'street_n', 'neighborhood', 'city', 'state', 'complement', 'reference']
                });

              case 3:
                endereco = _context2.sent;
                return _context2.abrupt("return", res.json(endereco));

              case 5:
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
        var address, _yield$address$update, id, postal_code, street, street_n, neighborhood, city, state, complement, reference;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Address["default"].findOne({
                  where: {
                    id: req.params.id
                  }
                });

              case 2:
                address = _context3.sent;
                _context3.next = 5;
                return address.update(req.body);

              case 5:
                _yield$address$update = _context3.sent;
                id = _yield$address$update.id;
                postal_code = _yield$address$update.postal_code;
                street = _yield$address$update.street;
                street_n = _yield$address$update.street_n;
                neighborhood = _yield$address$update.neighborhood;
                city = _yield$address$update.city;
                state = _yield$address$update.state;
                complement = _yield$address$update.complement;
                reference = _yield$address$update.reference;
                return _context3.abrupt("return", res.json({
                  id: id,
                  postal_code: postal_code,
                  street: street,
                  street_n: street_n,
                  neighborhood: neighborhood,
                  city: city,
                  state: state,
                  complement: complement,
                  reference: reference
                }));

              case 16:
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
                return _Address["default"].destroy({
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
  return AdressesUserLogadoController;
}();

var _default = new AdressesUserLogadoController();

exports["default"] = _default;