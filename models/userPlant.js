module.exports = function (sequelize, DataTypes) {
    var UserPlant = sequelize.define("UserPlant", {
        plant: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1, 500]
        }
        },
        {
            freezeTableName: true,
    });

    UserPlant.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        UserPlant.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return UserPlant;
};
