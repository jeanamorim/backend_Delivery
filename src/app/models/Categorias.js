import Sequelize, { Model } from 'sequelize';

class Categorias extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize: connection,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(models.Estabelecimentos, {
      foreignKey: 'estabelecimento_id',
      as: 'estabelecimentos',
    });
  }
}

export default Categorias;
