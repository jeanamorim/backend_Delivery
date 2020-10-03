"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _Cache = _interopRequireDefault(require("./lib/Cache"));

var _multer2 = _interopRequireDefault(require("./config/multer"));

var _UserController = _interopRequireDefault(require("./app/controllers/UserController"));

var _AddressController = _interopRequireDefault(require("./app/controllers/AddressController"));

var _AdminController = _interopRequireDefault(require("./app/controllers/AdminController"));

var _SessionController = _interopRequireDefault(require("./app/controllers/SessionController"));

var _AdminSessionController = _interopRequireDefault(require("./app/controllers/AdminSessionController"));

var _FileController = _interopRequireDefault(require("./app/controllers/FileController"));

var _CategoryController = _interopRequireDefault(require("./app/controllers/CategoryController"));

var _BannerController = _interopRequireDefault(require("./app/controllers/BannerController"));

var _ProductController = _interopRequireDefault(require("./app/controllers/ProductController"));

var _OrderController = _interopRequireDefault(require("./app/controllers/OrderController"));

var _CartControllers = _interopRequireDefault(require("./app/controllers/CartControllers"));

var _UserOrderController = _interopRequireDefault(require("./app/controllers/UserOrderController"));

var _OfferController = _interopRequireDefault(require("./app/controllers/OfferController"));

var _SettingController = _interopRequireDefault(require("./app/controllers/SettingController"));

var _ProductDetailsController = _interopRequireDefault(require("./app/controllers/ProductDetailsController"));

var _ScheduleControllers = _interopRequireDefault(require("./app/controllers/ScheduleControllers"));

var _MetodoPagamentoController = _interopRequireDefault(require("./app/controllers/MetodoPagamentoController"));

var _FavoritosController = _interopRequireDefault(require("./app/controllers/FavoritosController"));

var _ProductListController = _interopRequireDefault(require("./app/controllers/ProductListController"));

var _RelatorioPedidosDataControlers = _interopRequireDefault(require("./app/controllers/RelatorioPedidosDataControlers"));

var _FreteController = _interopRequireDefault(require("./app/controllers/FreteController"));

var _VariacaoController = _interopRequireDefault(require("./app/controllers/VariacaoController"));

var _OpcaoController = _interopRequireDefault(require("./app/controllers/OpcaoController"));

var _EstabelecimentoController = _interopRequireDefault(require("./app/controllers/EstabelecimentoController"));

var _SessionEstabelecimentoController = _interopRequireDefault(require("./app/controllers/SessionEstabelecimentoController"));

var _OfertasestabelecimentoControllers = _interopRequireDefault(require("./app/controllers/ControllersMobile/OfertasestabelecimentoControllers"));

var _CategoriaestabelecimentoControllers = _interopRequireDefault(require("./app/controllers/ControllersMobile/CategoriaestabelecimentoControllers"));

var _BuscarEstabelecimentoPorId = _interopRequireDefault(require("./app/controllers/ControllersMobile/BuscarEstabelecimentoPorId"));

var _ProductEstabelecimentoController = _interopRequireDefault(require("./app/controllers/ControllersMobile/ProductEstabelecimentoController"));

var _AdressesUserLogadoController = _interopRequireDefault(require("./app/controllers/ControllersMobile/AdressesUserLogadoController"));

var _ListaOfertasGeralControllers = _interopRequireDefault(require("./app/controllers/ControllersMobile/ListaOfertasGeralControllers"));

var _VariacaoProdutoControllers = _interopRequireDefault(require("./app/controllers/ControllersMobile/VariacaoProdutoControllers"));

var _OpcaoVariacaoEstabControllers = _interopRequireDefault(require("./app/controllers/ControllersMobile/OpcaoVariacaoEstabControllers"));

var _ListAdressesPorIdController = _interopRequireDefault(require("./app/controllers/ControllersMobile/ListAdressesPorIdController"));

var _OrderUsersControllers = _interopRequireDefault(require("./app/controllers/ControllersMobile/OrderUsersControllers"));

var _BuscarEstabelecimentoCategoriaControllers = _interopRequireDefault(require("./app/controllers/ControllersMobile/BuscarEstabelecimentoCategoriaControllers"));

var _RemoveCartTotal = _interopRequireDefault(require("./app/controllers/ControllersMobile/RemoveCartTotal"));

var _BuscarProdutos = _interopRequireDefault(require("./app/controllers/ControllersMobile/BuscarProdutos"));

var _OrdersById = _interopRequireDefault(require("./app/controllers/ControllersMobile/OrdersById"));

var _TotalCancelado = _interopRequireDefault(require("./app/controllers/ControllerRelatorios/TotalCancelado"));

var _TotalCartao = _interopRequireDefault(require("./app/controllers/ControllerRelatorios/TotalCartao"));

var _TotalDinheiro = _interopRequireDefault(require("./app/controllers/ControllerRelatorios/TotalDinheiro"));

var _TotalEntregues = _interopRequireDefault(require("./app/controllers/ControllerRelatorios/TotalEntregues"));

var _TotalPedidos = _interopRequireDefault(require("./app/controllers/ControllerRelatorios/TotalPedidos"));

var _TotalPendentes = _interopRequireDefault(require("./app/controllers/ControllerRelatorios/TotalPendentes"));

var _ValorTotalPedidos = _interopRequireDefault(require("./app/controllers/ControllerRelatorios/ValorTotalPedidos"));

var _FaturamentoTotal = _interopRequireDefault(require("./app/controllers/ControllerRelatorios/FaturamentoTotal"));

var _ListProductIds = _interopRequireDefault(require("./app/controllers/ControllersEditsProductsCategoria/ListProductIds"));

var _ListCategoriaIds = _interopRequireDefault(require("./app/controllers/ControllersEditsProductsCategoria/ListCategoriaIds"));

var _ListVariacaoId = _interopRequireDefault(require("./app/controllers/ControllersEditsProductsCategoria/ListVariacaoId"));

var _ListOpcaoIds = _interopRequireDefault(require("./app/controllers/ControllersEditsProductsCategoria/ListOpcaoIds"));

var _OrderController2 = _interopRequireDefault(require("./app/controllers/ControllersAdmins/OrderController"));

var _CategoryStore = _interopRequireDefault(require("./app/validators/CategoryStore"));

var _OfferStore = _interopRequireDefault(require("./app/validators/OfferStore"));

var _OfferUpdate = _interopRequireDefault(require("./app/validators/OfferUpdate"));

var _OrderStore = _interopRequireDefault(require("./app/validators/OrderStore"));

var _OrderUpdate = _interopRequireDefault(require("./app/validators/OrderUpdate"));

var _ProductStore = _interopRequireDefault(require("./app/validators/ProductStore"));

var _ProductUpdate = _interopRequireDefault(require("./app/validators/ProductUpdate"));

var _SessionStore = _interopRequireDefault(require("./app/validators/SessionStore"));

var _AddressStore = _interopRequireDefault(require("./app/validators/AddressStore"));

var _AddressUpdate = _interopRequireDefault(require("./app/validators/AddressUpdate"));

var _UserStore = _interopRequireDefault(require("./app/validators/UserStore"));

var _UserUpdate = _interopRequireDefault(require("./app/validators/UserUpdate"));

var _EstabelecimentoUpdate = _interopRequireDefault(require("./app/validators/EstabelecimentoUpdate"));

var _auth = _interopRequireDefault(require("./app/middlewares/auth"));

var _authEstabelecimento = _interopRequireDefault(require("./app/middlewares/authEstabelecimento"));

// import redis from 'redis';
// import ExpressBruteFlexible from 'rate-limiter-flexible/lib/ExpressBruteFlexible';
// controllers
// listar produtos e categorias por id para o painel web
// coontrollers do adminstrador
// validators
// import validateVariacaoStore from './app/validators/VariacaoStore';
// middlewares
// configs
var routes = new _express.Router();
var upload = (0, _multer["default"])(_multer2["default"]); // const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
// });
// const bruteForce = new ExpressBruteFlexible(
//   ExpressBruteFlexible.LIMITER_TYPES.REDIS,
//   {
//     freeRetries: 100,
//     storeClient: redisClient,
//   },
// );
// routes
// routes do administrador

routes.get('/OrderAdmin', _OrderController2["default"].index);
routes.post('/users', _UserStore["default"], _UserController["default"].store);
routes.post('/estabelecimento', _EstabelecimentoController["default"].store);
routes.put('/estabelecimento', _authEstabelecimento["default"], _EstabelecimentoUpdate["default"], _EstabelecimentoController["default"].update);
routes.get('/estabelecimento', _EstabelecimentoController["default"].index);
routes.post('/sessions', // bruteForce.prevent,
_SessionStore["default"], _SessionController["default"].store);
routes.post('/sessionsEstabelecimento', // bruteForce.prevent,
_SessionStore["default"], _SessionEstabelecimentoController["default"].store);
routes.post('/admin/sessions', // bruteForce.prevent,
_SessionStore["default"], _AdminSessionController["default"].store);
routes.get('/users', _auth["default"], _UserController["default"].index);
routes.put('/users', _auth["default"], _UserUpdate["default"], _UserController["default"].update);
routes.post('/address', _auth["default"], _AddressStore["default"], _AddressController["default"].store);
routes.get('/address', _auth["default"], _AddressController["default"].index); // buscar um unico endereco por id

routes.get('/addressUser/:id', _ListAdressesPorIdController["default"].index); // buscar todos enderecos do usuario logado por id

routes.get('/address_estab/:id', _AdressesUserLogadoController["default"].index); // excluir um endereco do usuario logado no app

routes["delete"]('/address_estab/:id', _AdressesUserLogadoController["default"]["delete"]); // atualiza um endereco do usuario logado no app

routes.put('/address_estab/:id', _AdressesUserLogadoController["default"].update); // cadastra um endereco do usuario logado no app

routes.post('/address_estab', _AdressesUserLogadoController["default"].store); // buscar ofertas por estabelecimento no mobile

routes.get('/offer_estab/:id', _OfertasestabelecimentoControllers["default"].index); // buscar categorias por estabelecimento no mobile

routes.get('/categories_estab/:id', _CategoriaestabelecimentoControllers["default"].index); // buscar valores de frete por estabelecimento no mobile

routes.get('/settings', _SettingController["default"].index);
routes.put('/address', _auth["default"], _AddressUpdate["default"], _AddressController["default"].update); // buscar estabelecimento por categoria e pesquisar por nome

routes.get('/buscarestabelecimento', _BuscarEstabelecimentoCategoriaControllers["default"].index); // buscar pedido por cliente logado no app

routes.get('/orders_user/:id', _OrderUsersControllers["default"].index); // lista todas ofertas de todos estabelecimento

routes.get('/offersGeral', _ListaOfertasGeralControllers["default"].index); // lista todas variacoes por produto passando o id do produto

routes.get('/variacao_produto/:id', _VariacaoProdutoControllers["default"].index); // lista todas as opcoes das variacoes passando o id da variacao

routes.get('/opcao_variacao/:id', _OpcaoVariacaoEstabControllers["default"].index); // lista todas as produtos de uam categoria

routes.get('/productsCategorias/:id', _ProductEstabelecimentoController["default"].index); // listar estabelecimento por id

routes.get('/offersEstabelecimento/:id', _BuscarEstabelecimentoPorId["default"].index);
routes.post('/banners', _BannerController["default"].store);
routes.get('/banners', _BannerController["default"].index);
routes["delete"]('/banners/:id', _BannerController["default"]["delete"]); // relatorio dos pedidos por dia do estabelecimento

routes.get('/relatoriopedidos', _authEstabelecimento["default"], _RelatorioPedidosDataControlers["default"].index);
routes.get('/totalCancelado', _authEstabelecimento["default"], _TotalCancelado["default"].index);
routes.get('/totalCartao', _authEstabelecimento["default"], _TotalCartao["default"].index);
routes.get('/totalDinheiro', _authEstabelecimento["default"], _TotalDinheiro["default"].index);
routes.get('/totalEntregue', _authEstabelecimento["default"], _TotalEntregues["default"].index);
routes.get('/totalPedido', _authEstabelecimento["default"], _TotalPedidos["default"].index);
routes.get('/totalPendente', _authEstabelecimento["default"], _TotalPendentes["default"].index);
routes.get('/valorTotal', _authEstabelecimento["default"], _ValorTotalPedidos["default"].index);
routes.post('/admins', _AdminController["default"].store);
routes.get('/admins', _AdminController["default"].index);
routes["delete"]('/admins/:id', _AdminController["default"]["delete"]);
routes.get('/listOpcao/:id', _ListOpcaoIds["default"].index); // lista opcao por id

routes.get('/categorialist/:id', _ListCategoriaIds["default"].index); // lista categoria por id

routes.get('/productsEdit/:id', _authEstabelecimento["default"], _ListProductIds["default"].index); // lista produto por id

routes.get('/variacaoedit/:id', _ListVariacaoId["default"].index); // lista variacao por id
// carrinho em geral post/put/delete

routes.post('/cart', _CartControllers["default"].store);
routes.get('/cart/:id', _CartControllers["default"].index);
routes.put('/cart/:id', _CartControllers["default"].update);
routes["delete"]('/cart/:id', _CartControllers["default"]["delete"]);
routes["delete"]('/cartRemove/:id', _RemoveCartTotal["default"]["delete"]); // todos as orders dos usuarios post/delete/put

routes.get('/orders/:id', _UserOrderController["default"].index); // lista orders por id

routes.post('/orders', _auth["default"], _OrderStore["default"], _OrderController["default"].store);
routes.get('/orders', _authEstabelecimento["default"], _OrderController["default"].index);
routes.get('/orders/:id', _OrdersById["default"].index);
routes.put('/orders/:id', _auth["default"], _OrderUpdate["default"], _OrderController["default"].update);
routes["delete"]('/orders/:id', _auth["default"], _OrderController["default"]["delete"]);
routes.get('/faturamentoTotal', _authEstabelecimento["default"], _FaturamentoTotal["default"].index); // produtos de todos os estabelecimentos

routes.post('/products', _authEstabelecimento["default"], _ProductStore["default"], _ProductController["default"].store);
routes.get('/products', _authEstabelecimento["default"], _ProductController["default"].index);
routes.get('/productsearch/:id', _BuscarProdutos["default"].index);
routes.get('/productsList', _authEstabelecimento["default"], _ProductListController["default"].index);
routes.get('/products/:id', _authEstabelecimento["default"], _ProductDetailsController["default"].index);
routes["delete"]('/products/:id', _authEstabelecimento["default"], _ProductController["default"]["delete"]);
routes.put('/products/:id', _authEstabelecimento["default"], _ProductUpdate["default"], _ProductController["default"].update); // cadastra imagem de produtos/categorias

routes.post('/files', upload.single('file'), _FileController["default"].store); // categorias dos produtos de cada loja

routes.post('/categories', _authEstabelecimento["default"], _CategoryStore["default"], _CategoryController["default"].store);
routes.get('/categories', _authEstabelecimento["default"], _CategoryController["default"].index);
routes["delete"]('/categories/:id', _authEstabelecimento["default"], _CategoryController["default"]["delete"]);
routes.put('/categories/:id', _authEstabelecimento["default"], _CategoryController["default"].update); // ofertas de cada estabelecimento

routes.post('/offers', _authEstabelecimento["default"], _OfferStore["default"], _OfferController["default"].store);
routes.get('/offers', _authEstabelecimento["default"], _OfferController["default"].index);
routes.put('/offers/:id', _authEstabelecimento["default"], _OfferUpdate["default"], _OfferController["default"].update);
routes["delete"]('/offers/:id', _authEstabelecimento["default"], _OfferController["default"]["delete"]); // configuracoes dos fretes

routes.post('/settings', _authEstabelecimento["default"], _SettingController["default"].store);
routes.get('/settings', _authEstabelecimento["default"], _SettingController["default"].index);
routes.put('/settings', _authEstabelecimento["default"], _SettingController["default"].update); // frete de cada estabelecimentos/valores/entregas

routes.post('/frete', _authEstabelecimento["default"], _FreteController["default"].store);
routes.get('/frete', _authEstabelecimento["default"], _FreteController["default"].index);
routes.put('/frete/:id', _authEstabelecimento["default"], _FreteController["default"].update);
routes["delete"]('/frete', _authEstabelecimento["default"], _FreteController["default"]["delete"]); // variacao dos produtos tipo/sabores/adicionais

routes.post('/variacao', _authEstabelecimento["default"], _VariacaoController["default"].store);
routes.get('/variacao', _authEstabelecimento["default"], _VariacaoController["default"].index);
routes.put('/variacao/:id', _authEstabelecimento["default"], _VariacaoController["default"].update);
routes["delete"]('/variacao/:id', _authEstabelecimento["default"], _VariacaoController["default"]["delete"]); // /opção das variaçoes dos itens dos estabelecimentos

routes.post('/opcaovariacao', _authEstabelecimento["default"], _OpcaoController["default"].store);
routes.get('/opcaovariacao', _authEstabelecimento["default"], _OpcaoController["default"].index);
routes.put('/opcaovariacao/:id', _authEstabelecimento["default"], _OpcaoController["default"].update);
routes["delete"]('/opcaovariacao/:id', _authEstabelecimento["default"], _OpcaoController["default"]["delete"]);
routes.post('/schedule', _authEstabelecimento["default"], _ScheduleControllers["default"].store);
routes.get('/schedule', _authEstabelecimento["default"], _ScheduleControllers["default"].index);
routes.put('/schedule/:id', _authEstabelecimento["default"], _ScheduleControllers["default"].update);
routes["delete"]('/schedule/:id', _authEstabelecimento["default"], _ScheduleControllers["default"]["delete"]);
routes.post('/pagamento', _authEstabelecimento["default"], _MetodoPagamentoController["default"].store);
routes.get('/pagamento', _authEstabelecimento["default"], _MetodoPagamentoController["default"].index);
routes.put('/pagamento/:id', _authEstabelecimento["default"], _MetodoPagamentoController["default"].update);
routes["delete"]('/pagamento/:id', _authEstabelecimento["default"], _MetodoPagamentoController["default"]["delete"]);
routes.post('/favoritos', _FavoritosController["default"].store);
routes.get('/favoritos/:id', _FavoritosController["default"].index);
routes["delete"]('/favoritos/:id', _FavoritosController["default"]["delete"]);
routes.get('/invalidate/all', _authEstabelecimento["default"], /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Cache["default"].invalidateAll();

          case 2:
            return _context.abrupt("return", res.json('Cache limpo!'));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = routes;
exports["default"] = _default;