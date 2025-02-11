import Sequelize, { Model } from 'sequelize';

class Setting extends Model {
  static init(connection) {
    super.init(
      {
        delivery_fee: Sequelize.STRING,
      },
      {
        sequelize: connection,
        tableName: 'settings',
      },
    );

    return this;
  }
}

export default Setting;
