module.exports = (sequelize, DataTypes) => {
  const follow = sequelize.define('follow', {});
  follow.associate = function (models) {
    follow.belongsTo(models.user, {
      foreignKey: 'follower',
    });
    follow.belongsTo(models.user, {
      foreignKey: 'following',
    });
  };
  return follow;
};
