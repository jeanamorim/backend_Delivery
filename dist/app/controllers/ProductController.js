"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sequelize = require("sequelize");

var _Product = _interopRequireDefault(require("../models/Product"));

var _File = _interopRequireDefault(require("../models/File"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _Estabelecimento = _interopRequireDefault(require("../models/Estabelecimento"));

var _Variacao = _interopRequireDefault(require("../models/Variacao"));

var _Opcao = _interopRequireDefault(require("../models/Opcao"));

var _websocket = require("../../websocket");

var _FormatProductService = _interopRequireDefault(require("../../services/FormatProductService"));

// import AdminCheckService from '../../services/AdminCheckService';
var ProductController = /*#__PURE__*/function () {
  function ProductController() {
    (0, _classCallCheck2["default"])(this, ProductController);
  }

  (0, _createClass2["default"])(ProductController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, name, description, quantity, unit, image_id, category_id, price, variacao, products;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //  await AdminCheckService.run({ user_id: req.userId });
                _req$body = req.body, name = _req$body.name, description = _req$body.description, quantity = _req$body.quantity, unit = _req$body.unit, image_id = _req$body.image_id, category_id = _req$body.category_id, price = _req$body.price, variacao = _req$body.variacao;
                _context.next = 3;
                return _Product["default"].create({
                  estabelecimento_id: req.estabelecimentoId,
                  name: name,
                  description: description,
                  quantity: quantity,
                  unit: unit,
                  image_id: image_id,
                  category_id: category_id,
                  price: price,
                  variacao: variacao
                });

              case 3:
                products = _context.sent;

                if (variacao && variacao.length > 0) {
                  products.setVariacao(variacao);
                } // / fazendo a chamada do produto cadastrado para enviar para o socket
                // const NewProduct = await Product.findAll({
                //   where: {
                //     id: products.id,
                //   },
                //   attributes: ['id', 'name', 'description', 'price', 'unit', 'quantity'],
                //   include: [
                //     {
                //       model: File,
                //       as: 'image',
                //       attributes: ['id', 'path', 'url'],
                //     },
                //     {
                //       model: Category,
                //       as: 'category',
                //       attributes: ['id', 'name'],
                //       include: [
                //         {
                //           model: File,
                //           as: 'image',
                //           attributes: ['id', 'path', 'url'],
                //         },
                //       ],
                //     },
                //     {
                //       model: Variacao,
                //       as: 'variacao',
                //       attributes: ['id', 'name', 'minimo', 'maximo'],
                //       through: { attributes: [] },
                //       include: [
                //         {
                //           model: Opcao,
                //           as: 'opcao',
                //           attributes: ['id', 'name', 'price', 'status'],
                //           through: { attributes: [] },
                //         },
                //       ],
                //     },
                //   ],
                // });
                // sendMessage(products.estabelecimento_id, 'NEW_PRODUCT', NewProduct);


                return _context.abrupt("return", res.json(products));

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
        var product, productFormatted, products, productsFormatted, searchedProducts, _productsFormatted;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!req.params.id) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 3;
                return _Product["default"].findByPk(req.params.id, {
                  attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['id', 'path', 'url']
                  }, {
                    model: _Category["default"],
                    as: 'category',
                    attributes: ['id', 'name']
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja']
                  }, {
                    model: _Variacao["default"],
                    as: 'variacao',
                    attributes: ['id', 'name', 'minimo', 'maximo'],
                    through: {
                      attributes: []
                    },
                    include: [{
                      model: _Opcao["default"],
                      as: 'opcao',
                      attributes: ['id', 'name', 'price', 'status'],
                      through: {
                        attributes: []
                      }
                    }]
                  }]
                });

              case 3:
                product = _context2.sent;
                _context2.next = 6;
                return _FormatProductService["default"].run(product);

              case 6:
                productFormatted = _context2.sent;
                return _context2.abrupt("return", res.json(productFormatted));

              case 8:
                if (!req.query) {
                  _context2.next = 25;
                  break;
                }

                if (!req.query.category) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 12;
                return _Product["default"].findAll({
                  where: {
                    category_id: req.query.category
                  },
                  attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['id', 'path', 'url']
                  }, {
                    model: _Category["default"],
                    as: 'category',
                    attributes: ['id', 'name']
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja']
                  }, {
                    model: _Variacao["default"],
                    as: 'variacao',
                    attributes: ['id', 'name', 'minimo', 'maximo'],
                    through: {
                      attributes: []
                    },
                    include: [{
                      model: _Opcao["default"],
                      as: 'opcao',
                      attributes: ['id', 'name', 'price', 'status'],
                      through: {
                        attributes: []
                      }
                    }]
                  }]
                });

              case 12:
                products = _context2.sent;
                _context2.next = 15;
                return _FormatProductService["default"].run(products);

              case 15:
                productsFormatted = _context2.sent;
                return _context2.abrupt("return", res.json(productsFormatted));

              case 17:
                if (!req.query.search) {
                  _context2.next = 25;
                  break;
                }

                _context2.next = 20;
                return _Product["default"].findAll({
                  where: {
                    name: (0, _defineProperty2["default"])({}, _sequelize.Op.iLike, "%".concat(req.query.search, "%"))
                  },
                  attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['id', 'path', 'url']
                  }, {
                    model: _Category["default"],
                    as: 'category',
                    attributes: ['id', 'name']
                  }, {
                    model: _Estabelecimento["default"],
                    as: 'estabelecimento',
                    attributes: ['id', 'name_loja']
                  }, {
                    model: _Variacao["default"],
                    as: 'variacao',
                    attributes: ['id', 'name', 'minimo', 'maximo'],
                    through: {
                      attributes: []
                    },
                    include: [{
                      model: _Opcao["default"],
                      as: 'opcao',
                      attributes: ['id', 'name', 'price', 'status'],
                      through: {
                        attributes: []
                      }
                    }]
                  }]
                });

              case 20:
                searchedProducts = _context2.sent;
                _context2.next = 23;
                return _FormatProductService["default"].run(searchedProducts);

              case 23:
                _productsFormatted = _context2.sent;
                return _context2.abrupt("return", res.json(_productsFormatted));

              case 25:
                return _context2.abrupt("return", res.json());

              case 26:
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
        var id, post, _req$body2, variacao, data;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // await AdminCheckService.run({ user_id: req.userId });
                id = req.params.id;
                _context3.next = 3;
                return _Product["default"].findByPk(id);

              case 3:
                post = _context3.sent;
                _req$body2 = req.body, variacao = _req$body2.variacao, data = (0, _objectWithoutProperties2["default"])(_req$body2, ["variacao"]);
                post.update(data);

                if (variacao && variacao.length > 0) {
                  post.setVariacao(variacao);
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
                return _Product["default"].destroy({
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
  return ProductController;
}();

var _default = new ProductController();

exports["default"] = _default;