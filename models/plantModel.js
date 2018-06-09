
//CREATE Plants DB FIRST!!!!!!!!!!!!
module.exports = function(sequelize, DataTypes) {
    // Add code here to create a Post model
    // This model needs a title, a body, and a category
    // Don't forget to 'return' the post after defining
  
    var Plants = sequelize.define("Plants", {
      
      scientificName: {type: DataTypes.STRING,primaryKey: true, allowNull: false,validate:{len: [1,140] }},
      commonName: {type: DataTypes.TEXT, allowNull: false,},
      flowerColor: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      flowerCons: {type:DataTypes.BOOLEAN,allowNull: false},
      foliageColor:{type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      shapeOri: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      hedgeTol: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,15] }},
      anaerTol: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      cacoTol: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      droughtTol: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      shadeTol: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      lifeSpan: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      frostMin:{type: DataTypes.INTEGER, allowNull: false},
      bloomPer: {type: DataTypes.INTEGER, allowNull: false},
      heightBase: {type: DataTypes.INTEGER, allowNull: false},
      heightMat: {type: DataTypes.INTEGER, allowNull: false},
      rootDepth: {type: DataTypes.INTEGER, allowNull: false},
      tempMin: {type: DataTypes.INTEGER, allowNull: false},
      moistUse: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      precMin: {type: DataTypes.INTEGER, allowNull: false},
      precMax: {type: DataTypes.INTEGER, allowNull: false},
      alleopath: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      nitroFix: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      resprout: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      toxicity: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      salTal: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      comAv: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      protPot: {type: DataTypes.STRING, allowNull: false,validate:{len: [1,25] }},
      

    });
    return Plants;
  };