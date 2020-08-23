import { Router } from 'express';
import multer from 'multer';
// import redis from 'redis';
// import ExpressBruteFlexible from 'rate-limiter-flexible/lib/ExpressBruteFlexible';

import Cache from './lib/Cache';

import multerConfig from './config/multer';

// controllers

import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressController';
import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import AdminSessionController from './app/controllers/AdminSessionController';
import FileController from './app/controllers/FileController';
import CategoryController from './app/controllers/CategoryController';
import BannerController from './app/controllers/BannerController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';
import CartControllers from './app/controllers/CartControllers';
import UserOrderController from './app/controllers/UserOrderController';
import OfferController from './app/controllers/OfferController';
import SettingController from './app/controllers/SettingController';
import ProductDetails from './app/controllers/ProductDetailsController';
import Schedule from './app/controllers/ScheduleControllers';

import StatusPedidoControllers from './app/controllers/StatusPedidoControllers';
import ProductListControllers from './app/controllers/ProductListController';
import RelatorioPedidosData from './app/controllers/RelatorioPedidosDataControlers';
import FreteController from './app/controllers/FreteController';
import VariacaoControllers from './app/controllers/VariacaoController';
import OpcaoControllers from './app/controllers/OpcaoController';
import EstabelecimentoControllers from './app/controllers/EstabelecimentoController';
import SessionEstabelecimentoController from './app/controllers/SessionEstabelecimentoController';
import OfertasEstabelecimento from './app/controllers/ControllersMobile/OfertasestabelecimentoControllers';
import CategoriasEstabelecimento from './app/controllers/ControllersMobile/CategoriaestabelecimentoControllers';
import offersEstabelecimento from './app/controllers/ControllersMobile/BuscarEstabelecimentoPorId';
import ProductEstabelecimento from './app/controllers/ControllersMobile/ProductEstabelecimentoController';
import AddressesUserEstab from './app/controllers/ControllersMobile/AdressesUserLogadoController';
import OfertasGeral from './app/controllers/ControllersMobile/ListaOfertasGeralControllers';
import VariacaoProduto from './app/controllers/ControllersMobile/VariacaoProdutoControllers';
import OpcaoVariacaoEstabControllers from './app/controllers/ControllersMobile/OpcaoVariacaoEstabControllers';
import ListAdressesPorId from './app/controllers/ControllersMobile/ListAdressesPorIdController';
import OrderUserControllers from './app/controllers/ControllersMobile/OrderUsersControllers';
import BuscarPorCategoria from './app/controllers/ControllersMobile/BuscarEstabelecimentoCategoriaControllers';
import RemoveCartUser from './app/controllers/ControllersMobile/RemoveCartTotal';

import TotalCancelados from './app/controllers/ControllerRelatorios/TotalCancelado';
import TotalCartao from './app/controllers/ControllerRelatorios/TotalCartao';
import TotalDinheiro from './app/controllers/ControllerRelatorios/TotalDinheiro';
import Totalentregues from './app/controllers/ControllerRelatorios/TotalEntregues';
import TotalPedidos from './app/controllers/ControllerRelatorios/TotalPedidos';
import totalPendentes from './app/controllers/ControllerRelatorios/TotalPendentes';
import ValorTotal from './app/controllers/ControllerRelatorios/ValorTotalPedidos';
import FaturamentoTotal from './app/controllers/ControllerRelatorios/FaturamentoTotal';

// listar produtos e categorias por id para o painel web
import ListProductEdit from './app/controllers/ControllersEditsProductsCategoria/ListProductIds';
import ListCategoriaEdit from './app/controllers/ControllersEditsProductsCategoria/ListCategoriaIds';
import ListVariacaoEdit from './app/controllers/ControllersEditsProductsCategoria/ListVariacaoId';
import ListOpcaoEdit from './app/controllers/ControllersEditsProductsCategoria/ListOpcaoIds';
// coontrollers do adminstrador
import OrderControllerAdmins from './app/controllers/ControllersAdmins/OrderController';
// validators

import validateCategoryStore from './app/validators/CategoryStore';
import validateOfferStore from './app/validators/OfferStore';
import validateOfferUpdate from './app/validators/OfferUpdate';
import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';
import validateProductStore from './app/validators/ProductStore';
import validateProductUpdate from './app/validators/ProductUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateAddressStore from './app/validators/AddressStore';
import validateAddressUpdate from './app/validators/AddressUpdate';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
// import validateVariacaoStore from './app/validators/VariacaoStore';

// middlewares

import authMiddlewareUsers from './app/middlewares/auth';
import authMiddleware from './app/middlewares/authEstabelecimento';

// configs

const routes = new Router();
const upload = multer(multerConfig);

// const redisClient = redis.createClient({
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
routes.get('/OrderAdmin', OrderControllerAdmins.index);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/estabelecimento', EstabelecimentoControllers.store);
routes.put('/estabelecimento', EstabelecimentoControllers.update);
routes.get('/estabelecimento', EstabelecimentoControllers.index);

routes.post(
  '/sessions',
  // bruteForce.prevent,
  validateSessionStore,
  SessionController.store,
);
routes.post(
  '/sessionsEstabelecimento',
  // bruteForce.prevent,
  validateSessionStore,
  SessionEstabelecimentoController.store,
);

routes.post(
  '/admin/sessions',
  // bruteForce.prevent,
  validateSessionStore,
  AdminSessionController.store,
);

routes.get('/users', authMiddlewareUsers, UserController.index);
routes.put(
  '/users',
  authMiddlewareUsers,
  validateUserUpdate,
  UserController.update,
);
routes.post(
  '/address',
  authMiddlewareUsers,
  validateAddressStore,
  AddressController.store,
);

routes.get('/address', authMiddlewareUsers, AddressController.index);
// buscar um unico endereco por id
routes.get('/addressUser/:id', ListAdressesPorId.index);
// buscar todos enderecos do usuario logado por id
routes.get('/address_estab/:id', AddressesUserEstab.index);
// excluir um endereco do usuario logado no app
routes.delete('/address_estab/:id', AddressesUserEstab.delete);
// atualiza um endereco do usuario logado no app
routes.put('/address_estab/:id', AddressesUserEstab.update);
// cadastra um endereco do usuario logado no app
routes.post('/address_estab', AddressesUserEstab.store);
// buscar ofertas por estabelecimento no mobile
routes.get('/offer_estab/:id', OfertasEstabelecimento.index);
// buscar categorias por estabelecimento no mobile
routes.get('/categories_estab/:id', CategoriasEstabelecimento.index);
// buscar valores de frete por estabelecimento no mobile
routes.get('/settings', SettingController.index);
routes.put(
  '/address',
  authMiddlewareUsers,
  validateAddressUpdate,
  AddressController.update,
);
// buscar estabelecimento por categoria e pesquisar por nome
routes.get('/buscarestabelecimento', BuscarPorCategoria.index);
// buscar pedido por cliente logado no app
routes.get('/orders_user/:id', OrderUserControllers.index);
// lista todas ofertas de todos estabelecimento
routes.get('/offersGeral', OfertasGeral.index);
// lista todas variacoes por produto passando o id do produto
routes.get('/variacao_produto/:id', VariacaoProduto.index);
// lista todas as opcoes das variacoes passando o id da variacao
routes.get('/opcao_variacao/:id', OpcaoVariacaoEstabControllers.index);
// lista todas as produtos de uam categoria
routes.get('/productsCategorias/:id', ProductEstabelecimento.index);
// listar estabelecimento por id
routes.get('/offersEstabelecimento/:id', offersEstabelecimento.index);

routes.post('/banners', BannerController.store);
routes.get('/banners', BannerController.index);
routes.delete('/banners/:id', BannerController.delete);

// relatorio dos pedidos por dia do estabelecimento
routes.get('/relatoriopedidos', authMiddleware, RelatorioPedidosData.index);
routes.get('/totalCancelado', authMiddleware, TotalCancelados.index);
routes.get('/totalCartao', authMiddleware, TotalCartao.index);
routes.get('/totalDinheiro', authMiddleware, TotalDinheiro.index);
routes.get('/totalEntregue', authMiddleware, Totalentregues.index);
routes.get('/totalPedido', authMiddleware, TotalPedidos.index);
routes.get('/totalPendente', authMiddleware, totalPendentes.index);
routes.get('/valorTotal', authMiddleware, ValorTotal.index);

routes.post('/admins', AdminController.store);
routes.get('/admins', AdminController.index);
routes.delete('/admins/:id', AdminController.delete);

routes.get('/listOpcao/:id', ListOpcaoEdit.index); // lista opcao por id
routes.get('/categorialist/:id', ListCategoriaEdit.index); // lista categoria por id
routes.get('/productsEdit/:id', authMiddleware, ListProductEdit.index); // lista produto por id
routes.get('/variacaoedit/:id', ListVariacaoEdit.index); // lista variacao por id
// carrinho em geral post/put/delete
routes.post('/cart', CartControllers.store);
routes.get('/cart/:id', CartControllers.index);
routes.put('/cart/:id', CartControllers.update);
routes.delete('/cart/:id', CartControllers.delete);
routes.delete('/cartRemove/:id', RemoveCartUser.delete);

// todos as orders dos usuarios post/delete/put
routes.get('/orders/:id', UserOrderController.index); // lista orders por id
routes.get('/status/:id', authMiddleware, StatusPedidoControllers.index); // lista por status
routes.post(
  '/orders',
  authMiddlewareUsers,
  validateOrderStore,
  OrderController.store,
);
routes.get('/orders', authMiddleware, OrderController.index);
routes.put(
  '/orders/:id',
  authMiddlewareUsers,
  validateOrderUpdate,
  OrderController.update,
);
routes.delete('/orders/:id', authMiddlewareUsers, OrderController.delete);

routes.get('/faturamentoTotal', authMiddleware, FaturamentoTotal.index);
// produtos de todos os estabelecimentos
routes.post(
  '/products',
  authMiddleware,
  validateProductStore,
  ProductController.store,
);
routes.get('/products', authMiddleware, ProductController.index);
routes.get('/productsList', authMiddleware, ProductListControllers.index);
routes.get('/products/:id', authMiddleware, ProductDetails.index);
routes.delete('/products/:id', authMiddleware, ProductController.delete);
routes.put(
  '/products/:id',
  authMiddleware,
  validateProductUpdate,
  ProductController.update,
);

// cadastra imagem de produtos/categorias
routes.post('/files', upload.single('file'), FileController.store);
// categorias dos produtos de cada loja
routes.post(
  '/categories',
  authMiddleware,
  validateCategoryStore,
  CategoryController.store,
);
routes.get('/categories', authMiddleware, CategoryController.index);
routes.delete('/categories/:id', authMiddleware, CategoryController.delete);
routes.put('/categories/:id', authMiddleware, CategoryController.update);
// ofertas de cada estabelecimento
routes.post(
  '/offers',
  authMiddleware,
  validateOfferStore,
  OfferController.store,
);
routes.get('/offers', authMiddleware, OfferController.index);
routes.put(
  '/offers/:id',
  authMiddleware,
  validateOfferUpdate,
  OfferController.update,
);
routes.delete('/offers/:id', authMiddleware, OfferController.delete);
// configuracoes dos fretes
routes.post('/settings', authMiddleware, SettingController.store);
routes.get('/settings', authMiddleware, SettingController.index);
routes.put('/settings', authMiddleware, SettingController.update);
// frete de cada estabelecimentos/valores/entregas
routes.post('/frete', authMiddleware, FreteController.store);
routes.get('/frete', authMiddleware, FreteController.index);
routes.put('/frete/:id', authMiddleware, FreteController.update);
routes.delete('/frete/:id', authMiddleware, FreteController.delete);
// variacao dos produtos tipo/sabores/adicionais
routes.post('/variacao', authMiddleware, VariacaoControllers.store);
routes.get('/variacao', authMiddleware, VariacaoControllers.index);
routes.put('/variacao/:id', authMiddleware, VariacaoControllers.update);
routes.delete('/variacao/:id', authMiddleware, VariacaoControllers.delete);
// /opção das variaçoes dos itens dos estabelecimentos
routes.post('/opcaovariacao', authMiddleware, OpcaoControllers.store);
routes.get('/opcaovariacao', authMiddleware, OpcaoControllers.index);
routes.put('/opcaovariacao/:id', authMiddleware, OpcaoControllers.update);
routes.delete('/opcaovariacao/:id', authMiddleware, OpcaoControllers.delete);

routes.post('/schedule', authMiddleware, Schedule.store);
routes.get('/schedule', authMiddleware, Schedule.index);
routes.delete('/schedule/:id', authMiddleware, Schedule.delete);

routes.get('/invalidate/all', authMiddleware, async (req, res) => {
  await Cache.invalidateAll();
  return res.json('Cache limpo!');
});

export default routes;
