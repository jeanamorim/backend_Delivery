import Sequelize, { Model } from 'sequelize';

class Variacao extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        minimo: Sequelize.FLOAT,
        maximo: Sequelize.FLOAT,
      },
      {
        sequelize: connection,
        tableName: 'variacao',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Product, {
      through: 'ProductsVariacoes',
      as: 'product',
      foreignKey: 'variacao_id',
    });
    this.belongsToMany(models.Opcao, {
      through: 'OpcaoVariacao',
      as: 'opcao',
      foreignKey: 'variacao_id',
    });
  }
}

export default Variacao;
