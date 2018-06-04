module.exports = function(sequelize, DataTypes) {
  // var Plant = sequelize.define("Plant", {
  //   // Giving the Author model a name of type STRING
  //   name: DataTypes.STRING
  // });

  // Plant.associate = function(models) {
  //   // Associating Author with Posts
  //   // When an Author is deleted, also delete any associated Posts
  //   Plant.hasMany(models.Post, {
  //     onDelete: "cascade"
  //   });
  // };

  return Plant;
};
