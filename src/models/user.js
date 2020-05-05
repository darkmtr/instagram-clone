module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenVersion: {
      type: DataTypes.INTEGER,
    },
  });
  user.associate = function (models) {
    user.hasMany(models.follow, {
      foreignKey: 'follower',
    });
    user.hasMany(models.follow, {
      foreignKey: 'following',
    });
    user.hasMany(models.comment);
    user.hasMany(models.like);
    user.hasOne(models.profile);
    user.hasMany(models.post, { foreignKey: 'postedBy' });
    // associations can be defined here
  };
  return user;
};
