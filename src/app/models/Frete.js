import Sequelize, { Model } from 'sequelize';

class Frete extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.FLOAT,
        status: Sequelize.STRING,
      },
      {
        sequelize: connection,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Estabelecimentos, {
      foreignKey: 'estabelecimento_id',
      as: 'estabelecimentos',
    });
  }
}

export default Frete;
