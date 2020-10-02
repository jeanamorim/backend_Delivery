import Sequelize, { Model } from 'sequelize';

class Favoritos extends Model {
  static init(connection) {
    super.init(
      {},
      {
        sequelize: connection,
        tableName: 'favoritos',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Estabelecimento, {
      foreignKey: 'estabelecimento_id',
      as: 'estabelecimento',
    });
  }
}

export default Favoritos;
