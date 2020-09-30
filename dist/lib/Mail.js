"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _path = require("path");

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _nodemailerExpressHandlebars = _interopRequireDefault(require("nodemailer-express-handlebars"));

var _mail = _interopRequireDefault(require("../config/mail"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Mail = /*#__PURE__*/function () {
  function Mail() {
    (0, _classCallCheck2["default"])(this, Mail);
    var host = _mail["default"].host,
        port = _mail["default"].port,
        secure = _mail["default"].secure,
        auth = _mail["default"].auth;
    this.transporter = _nodemailer["default"].createTransport({
      host: host,
      port: port,
      secure: secure,
      auth: auth.user ? auth : null
    });
    this.configureTemplates();
  }

  (0, _createClass2["default"])(Mail, [{
    key: "configureTemplates",
    value: function configureTemplates() {
      var viewPath = (0, _path.resolve)(__dirname, '..', 'app', 'views', 'emails');
      this.transporter.use('compile', (0, _nodemailerExpressHandlebars["default"])({
        viewEngine: _expressHandlebars["default"].create({
          layoutsDir: (0, _path.resolve)(viewPath, 'layouts'),
          partialsDir: (0, _path.resolve)(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
          helpers: {
            if_equal: function if_equal(a, b, opts) {
              return a === b ? opts.fn(this) : opts.inverse(this);
            },
            if_gt: function if_gt(a, b, opts) {
              return a > b ? opts.fn(this) : opts.inverse(this);
            }
          }
        }),
        viewPath: viewPath,
        extName: '.hbs'
      }));
    }
  }, {
    key: "sendMail",
    value: function sendMail(message) {
      return this.transporter.sendMail(_objectSpread(_objectSpread({}, _mail["default"]["default"]), message));
    }
  }]);
  return Mail;
}();

var _default = new Mail();

exports["default"] = _default;