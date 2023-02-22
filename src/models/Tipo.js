const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Tipo',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
