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

var _Category = _interopRequireDefault(require("../models/Category"));

var _File = _interopRequireDefault(require("../models/File"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _websocket = require("../../websocket");

var CategoryController = /*#__PURE__*/function () {
  function CategoryController() {
    (0, _classCallCheck2["default"])(this, CategoryController);
  }

  (0, _createClass2["default"])(CategoryController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, name, image_id, categories, Newcategories;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, name = _req$body.name, image_id = _req$body.image_id;
                _context.next = 3;
                return _Category["default"].create({
                  estabelecimento_id: req.estabelecimentoId,
                  name: name,
                  image_id: image_id
                });

              case 3:
                categories = _context.sent;
                _context.next = 6;
                return _Category["default"].findAll({
                  where: {
                    id: categories.id
                  },
                  attributes: ['id', 'name'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['id', 'path', 'url']
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja']
                  }]
                });

              case 6:
                Newcategories = _context.sent;
                // /enviar para o socket a categoria cadastrada
                (0, _websocket.sendMessage)(categories.estabelecimento_id, 'NEW_CATEGORIAS', Newcategories);
                return _context.abrupt("return", res.json(categories));

              case 9:
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
        var categories;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Category["default"].findAll({
                  where: {
                    estabelecimento_id: req.estabelecimentoId
                  },
                  attributes: ['id', 'name'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['id', 'path', 'url']
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja']
                  }]
                });

              case 2:
                categories = _context2.sent;
                return _context2.abrupt("return", res.json(categories));

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
        var category, _yield$category$updat, id, name, image_id, result;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Category["default"].findByPk(req.params.id);

              case 2:
                category = _context3.sent;
                _context3.next = 5;
                return category.update(req.body);

              case 5:
                _yield$category$updat = _context3.sent;
                id = _yield$category$updat.id;
                name = _yield$category$updat.name;
                image_id = _yield$category$updat.image_id;
                result = {
                  id: id,
                  name: name,
                  image_id: image_id
                };
                (0, _websocket.sendMessage)(req.estabelecimentoId, 'UPDATE_CATEGORIAS', result);
                return _context3.abrupt("return", res.json(result));

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
                return _Category["default"].destroy({
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
  return CategoryController;
}();

var _default = new CategoryController();

exports["default"] = _default;