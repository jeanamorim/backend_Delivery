"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dateFns = require("date-fns");

var _Product = _interopRequireDefault(require("../app/models/Product"));

var _Offer = _interopRequireDefault(require("../app/models/Offer"));

var _File = _interopRequireDefault(require("../app/models/File"));

var _Category = _interopRequireDefault(require("../app/models/Category"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FormatProductService = /*#__PURE__*/function () {
  function FormatProductService() {
    (0, _classCallCheck2["default"])(this, FormatProductService);
  }

  (0, _createClass2["default"])(FormatProductService, [{
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var data,
            products,
            offers,
            productsArray,
            offersArray,
            productsFormatted,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;

                if (!data) {
                  _context.next = 5;
                  break;
                }

                products = data;
                _context.next = 8;
                break;

              case 5:
                _context.next = 7;
                return _Product["default"].findAll({
                  attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
                  include: [{
                    model: _File["default"],
                    as: 'image',
                    attributes: ['path', 'url']
                  }, {
                    model: _Category["default"],
                    as: 'category',
                    attributes: ['id', 'name']
                  }]
                });

              case 7:
                products = _context.sent;

              case 8:
                _context.next = 10;
                return _Offer["default"].findAll({
                  attributes: ['id', 'product_id', 'quantity', 'unit', 'from', 'to', 'expiration_date'],
                  include: [{
                    model: _Product["default"],
                    as: 'product',
                    attributes: ['id', 'name', 'description', 'price', 'unit', 'quantity'],
                    include: [{
                      model: _File["default"],
                      as: 'image',
                      attributes: ['path', 'url']
                    }, {
                      model: _Category["default"],
                      as: 'category',
                      attributes: ['name']
                    }]
                  }]
                });

              case 10:
                offers = _context.sent;
                productsArray = JSON.parse(JSON.stringify(products));
                offersArray = JSON.parse(JSON.stringify(offers)).filter(function (offer) {
                  return !(0, _dateFns.isBefore)((0, _dateFns.parseISO)(offer.expiration_date), new Date());
                });

                if (Array.isArray(productsArray)) {
                  productsFormatted = productsArray.map(function (product) {
                    return _objectSpread(_objectSpread({}, product), {}, {
                      promo_price: (offersArray.find(function (offer) {
                        return offer.product.id === product.id;
                      }) || {}).to || false
                    });
                  });
                } else {
                  productsFormatted = _objectSpread(_objectSpread({}, productsArray), {}, {
                    promo_price: (offersArray.find(function (offer) {
                      return offer.product.id === productsArray.id;
                    }) || {}).to || false
                  });
                }

                return _context.abrupt("return", productsFormatted);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return FormatProductService;
}();

var _default = new FormatProductService();

exports["default"] = _default;