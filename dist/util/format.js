"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Intl$NumberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}),
    formatPrice = _Intl$NumberFormat.format;

var _default = formatPrice;
exports["default"] = _default;