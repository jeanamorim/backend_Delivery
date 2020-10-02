import Sequelize from 'sequelize';

import User from '../app/models/User';
import Admin from '../app/models/Admin';
import Address from '../app/models/Address';
import File from '../app/models/File';
import Banner from '../app/models/Banner';
import Category from '../app/models/Category';
import Product from '../app/models/Product';
import Order from '../app/models/Order';
import OrderDetail from '../app/models/OrderDetail';
import Offer from '../app/models/Offer';
import Setting from '../app/models/Setting';
import Estabelecimento from '../app/models/Estabelecimento';
import Variacao from '../app/models/Variacao';
import Frete from '../app/models/Frete';
import Opcao from '../app/models/Opcao';
import Cart from '../app/models/Cart';
import Schedule from '../app/models/Schedule';
import MetodoPagamento from '../app/models/MetodoPagamento';
import Favoritos from '../app/models/Favoritos';
import databaseConfig from '../config/database';

const models = [
  User,
  Admin,
  Address,
  File,
  Banner,
  Category,
  Product,
  Order,
  OrderDetail,
  Offer,
  Setting,
  Estabelecimento,
  Variacao,
  Frete,
  Opcao,
  Cart,
  Schedule,
  MetodoPagamento,
  Favoritos,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
