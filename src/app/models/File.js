import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        size: Sequelize.INTEGER,
        url: Sequelize.STRING,
      },
      {
        sequelize: connection,
        tableName: 'files',
      },
    );

    return this;
  }
}

export default File;
