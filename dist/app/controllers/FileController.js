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

var _File = _interopRequireDefault(require("../models/File"));

var FileController = /*#__PURE__*/function () {
  function FileController() {
    (0, _classCallCheck2["default"])(this, FileController);
  }

  (0, _createClass2["default"])(FileController, [{
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$file, path, name, size, url, response;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$file = req.file, path = _req$file.key, name = _req$file.originalname, size = _req$file.size, url = _req$file.location;
                _context.next = 3;
                return _File["default"].create({
                  name: name,
                  path: path,
                  size: size,
                  url: url
                });

              case 3:
                response = _context.sent;
                return _context.abrupt("return", res.json(response));

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
  }]);
  return FileController;
}();

var _default = new FileController();

exports["default"] = _default;