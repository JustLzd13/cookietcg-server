//[Dependencies and Modules]
const express = require('express');
const router = express.Router();
const sellingController = require('../controllers/selling.js'); // Assuming you have a selling controller

const { verify } = require("../auth.js"); 

//[Routing Component]

// Create a selling entry
router.post("/sell-product", verify, sellingController.sellProduct);

// Get all selling entries
router.get("/sell-products", verify, sellingController.getAllSelling);

// Get a specific selling entry by ID
router.get("/sell-product/:id", verify, sellingController.getSellingById);

// Update a selling entry by ID
router.put("/sell-product/:id", verify, sellingController.updateSellingById);

// Delete a selling entry by ID
router.delete("/sell-product/:id", verify, sellingController.deleteSellingById);

module.exports = router;
