module.exports = app => {
  const places = require("../controllers/place.controller.js");

  var router = require("express").Router();

  // Create a new place
  router.post("/", places.create);

  // Retrieve all places
  router.get("/", places.findAll);

 

  // Retrieve a single place with id
  router.get("/:id", places.findOne);

  // Update a place with id
  router.put("/:id", places.update);

  // Delete a place with id
  router.delete("/:id", places.delete);

  // Delete all places
  router.delete("/", places.deleteAll);

  app.use('/api/places', router);
};
