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

var _Admin = _interopRequireDefault(require("../app/models/Admin"));

var _User = _interopRequireDefault(require("../app/models/User"));

// import Cache from '../lib/Cache';
var AdminCheckService = /*#__PURE__*/function () {
  function AdminCheckService() {
    (0, _classCallCheck2["default"])(this, AdminCheckService);
  }

  (0, _createClass2["default"])(AdminCheckService, [{
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var user_id, admins, isAdmin;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user_id = _ref.user_id;
                _context.next = 3;
                return _Admin["default"].findAll({
                  attributes: ['id'],
                  include: [{
                    model: _User["default"],
                    as: 'user',
                    attributes: ['id', 'name', 'last_name', 'email', 'phone', 'birthday', 'gender', 'cpf']
                  }]
                });

              case 3:
                admins = _context.sent;
                // await Cache.set('admins', admins);
                isAdmin = admins.findIndex(function (admin) {
                  return admin.user.id === user_id;
                });

                if (!(isAdmin < 0)) {
                  _context.next = 7;
                  break;
                }

                throw new Error('Permission denied. Could not perform this operation');

              case 7:
                return _context.abrupt("return", true);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function run(_x) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return AdminCheckService;
}();

var _default = new AdminCheckService();

exports["default"] = _default;