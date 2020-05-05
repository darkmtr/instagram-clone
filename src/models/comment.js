'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    text: DataTypes.STRING,
  });
  comment.associate = function (models) {
    comment.belongsTo(models.post);
    comment.belongsTo(models.user);
    // associations can be defined here
  };
  return comment;
};
