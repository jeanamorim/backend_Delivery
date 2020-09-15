import { Model } from 'sequelize';

class Banner extends Model {
  static init(connection) {
    super.init(
      {},
      {
        sequelize: connection,
        tableName: 'banners',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { as: 'image', foreignKey: 'image_id' });
  }
}

export default Banner;
