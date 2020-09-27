import Sequelize, { Model } from 'sequelize';

class MetodoPagamento extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize: connection,
        tableName: 'metodo_pagament',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(models.Estabelecimento, {
      foreignKey: 'estabelecimento_id',
      as: 'estabelecimento',
    });
  }
}

export default MetodoPagamento;
