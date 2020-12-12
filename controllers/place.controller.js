const db = require("../models");
const Place = db.places;
const Op = db.Sequelize.Op;
const geocode= require('../utils/geococe.util.js')

// Create and Save a new place
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  ////////////////////////////////////////////////////////////////////////
  geocode(req.body.title,(error,{latitude,longitude,location}={})=> {
    if (error) {
        return console.log('Error', error)
        
    } 
    
    // Create a place
    const place = {
      title: req.body.title,
      latitude,
      longitude
    };
   // Save place in the database
    Place.create(place)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the place."
      });
    });  

})



  

 
};

// Retrieve all places from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Place.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving places."
      });
    });
};

// Find a single place with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Place.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving place with id=" + id
      });
    });
};

// Update a place by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Place.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "place was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update place with id=${id}. Maybe place was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating place with id=" + id
      });
    });
};

// Delete a place with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Place.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "place was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete place with id=${id}. Maybe place was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete place with id=" + id
      });
    });
};

// Delete all places from the database.
exports.deleteAll = (req, res) => {
  Place.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} places were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all places."
      });
    });
};


