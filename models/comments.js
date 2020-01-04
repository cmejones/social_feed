'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
  };
  return comments;
};