import Sequelize, { Model } from 'sequelize';

class Schedule extends Model {
  static init(connection) {
    super.init(
      {
        week_day: Sequelize.INTEGER,
        from: Sequelize.STRING,
        to: Sequelize.STRING,
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

export default Schedule;
