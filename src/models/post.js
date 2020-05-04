'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    description: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  post.associate = function (models) {
    post.belongsTo(models.user, {
      foreignKey: {
        name: 'postedBy',
      },
    });
  };
  return post;
};
