module.exports = (sequelize, Sequelize) => {
  const Place = sequelize.define("place", {
    title: {
      type: Sequelize.STRING
    },
    latitude: {
      type: Sequelize.FLOAT
    },
    longitude: {
      type: Sequelize.FLOAT
    }
  });

  return Place;
};
