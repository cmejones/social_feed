'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    body: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};