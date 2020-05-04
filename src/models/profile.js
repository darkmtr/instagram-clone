'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    bio: DataTypes.STRING,
    website: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://api.adorable.io/avatars/285/default@adorable.png',
    },
  });
  profile.associate = function (models) {
    // associations can be defined here
    profile.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return profile;
};
