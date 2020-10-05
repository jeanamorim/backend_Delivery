"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _beeQueue = _interopRequireDefault(require("bee-queue"));

var _NewOrderMail = _interopRequireDefault(require("../app/jobs/NewOrderMail"));

var _OrderCancellationMail = _interopRequireDefault(require("../app/jobs/OrderCancellationMail"));

var _redis = _interopRequireDefault(require("../config/redis"));

var jobs = [_NewOrderMail["default"], _OrderCancellationMail["default"]];

var Queue = /*#__PURE__*/function () {
  function Queue() {
    (0, _classCallCheck2["default"])(this, Queue);
    this.queues = {};
    this.init();
  }

  (0, _createClass2["default"])(Queue, [{
    key: "init",
    value: function init() {
      var _this = this;

      jobs.forEach(function (_ref) {
        var key = _ref.key,
            handle = _ref.handle;
        _this.queues[key] = {
          bee: new _beeQueue["default"](key, {
            redis: _redis["default"]
          }),
          handle: handle
        };
      });
    }
  }, {
    key: "add",
    value: function add(queue, job) {
      return this.queues[queue].bee.createJob(job).save();
    }
  }, {
    key: "processQueue",
    value: function processQueue() {
      var _this2 = this;

      jobs.forEach(function (job) {
        var _this2$queues$job$key = _this2.queues[job.key],
            bee = _this2$queues$job$key.bee,
            handle = _this2$queues$job$key.handle;
        bee.process(handle);
      });
    }
  }]);
  return Queue;
}();

var _default = new Queue();

exports["default"] = _default;