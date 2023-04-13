const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Diet', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        } 
    }, 
    {timestamps: false}
    );
};