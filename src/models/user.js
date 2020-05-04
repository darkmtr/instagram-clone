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
    user.hasOne(models.slug);
    user.hasOne(models.profile);
    user.hasMany(models.post, { as: 'postedBy' });
    // associations can be defined here
  };
  return user;
};
