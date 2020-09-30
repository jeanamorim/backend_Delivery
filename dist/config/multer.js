"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _crypto = _interopRequireDefault(require("crypto"));

var _path = _interopRequireDefault(require("path"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var storageTypes = {
  local: _multer["default"].diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, _path["default"].resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: function filename(req, file, cb) {
      _crypto["default"].randomBytes(16, function (err, hash) {
        if (err) cb(err);
        file.key = "".concat(hash.toString('hex'), "-").concat(file.originalname);
        cb(null, file.key);
      });
    }
  }),
  s3: (0, _multerS["default"])({
    s3: new _awsSdk["default"].S3(),
    bucket: 'meuuploads',
    contentType: _multerS["default"].AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function key(req, file, cb) {
      _crypto["default"].randomBytes(16, function (err, hash) {
        if (err) cb(err);
        var fileName = "".concat(hash.toString('hex'), "-").concat(file.originalname);
        cb(null, fileName);
      });
    }
  })
};
var _default = {
  dest: _path["default"].resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes.s3,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: function fileFilter(req, file, cb) {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
};
exports["default"] = _default;