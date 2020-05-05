module.exports = (sequelize, DataTypes) => {
  const follow = sequelize.define('follow', {});
  follow.associate = function (models) {
    follow.belongsTo(models.users, {
      foreignKey: 'follower',
    });
    follow.belongsTo(models.users, {
      foreignKey: 'following',
    });
  };
  return follow;
};
