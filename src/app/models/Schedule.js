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
        tableName: 'schedules'
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Estabelecimento, {
      foreignKey: 'estabelecimento_id',
      as: 'estabelecimento',
    });
  }
}

export default Schedule;
