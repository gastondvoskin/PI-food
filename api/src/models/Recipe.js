const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'Recipe', 
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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false
      }, 
      healthscore: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      steps: {
        // type: DataTypes.TEXT,
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, 
    {timestamps: false}
  );
};


      // inicio aún sin chequear
      // diets: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      // fin aún sin chequear
