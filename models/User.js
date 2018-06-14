// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//   //   // Giving the User model a name of type STRING
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       len: [1, 20]
//     }
//   });

//   User.associate = function(models) {
//   //   // Associating User with chat messages

//     User.hasMany(models.Chat, {

//     });
//   };

//   User.findOrCreate({
//     where: {
//       name: "Bob the Tester"
//     }
//   });

//   User.findOrCreate({
//     where: {
//       name: "Joe the Tester"
//     }
//   });
<<<<<<< HEAD

=======
>>>>>>> upstream/master

//   return User;
// };

// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 20]
    },

    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

<<<<<<< HEAD
  User.associate = function (models) {
    // Associating User with chat messages
    User.hasMany(models.UserPlant, {});
    // User.hasMany(models.UserPlants, {});
=======
  User.associate = function(models) {
    // Associating User with chat messages
    User.hasMany(models.Chat, {});
>>>>>>> upstream/master
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
<<<<<<< HEAD
  User.hook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
=======
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
>>>>>>> upstream/master
  });
  return User;
};
