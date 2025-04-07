// [Dependencies and Modules]
const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carousel.js'); // Make sure this controller exists

const { verify, verifyAdmin } = require("../auth.js");

// [Routing Component for Carousel]

// Create a carousel entry
router.post("/carousel", verify, verifyAdmin, carouselController.createCarouselItem);

// Get all carousel entries
router.get("/carousels", verify, verifyAdmin, carouselController.getAllCarouselItems);

// Get a specific carousel entry by ID
router.get("/carousel/:id", verify, verifyAdmin, carouselController.getCarouselItemById);

// Update a carousel entry by ID
router.put("/carousel/:id", verify, verifyAdmin, carouselController.updateCarouselItemById);

// Delete a carousel entry by ID
router.delete("/carousel/:id", verify, verifyAdmin, carouselController.deleteCarouselItemById);

module.exports = router;
