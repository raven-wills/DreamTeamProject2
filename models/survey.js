module.exports = function(sequelize, DataTypes) {
    var Survey = sequelize.define("Survey", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  

  
    return Survey;
  };
  