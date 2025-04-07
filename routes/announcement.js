// [Dependencies and Modules]
const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement.js'); // Make sure this controller exists

const { verify, verifyAdmin } = require("../auth.js");

// [Routing Component for Announcement]

// Create an announcement
router.post("/announcement", verify, verifyAdmin, announcementController.createAnnouncement);

// Get all announcements
router.get("/announcements", verify, verifyAdmin, announcementController.getAllAnnouncements);

// Get a specific announcement by ID
router.get("/announcement/:id", verify, verifyAdmin, announcementController.getAnnouncementById);

// Update an announcement by ID
router.put("/announcement/:id", verify, verifyAdmin, announcementController.updateAnnouncementById);

// Delete an announcement by ID
router.delete("/announcement/:id", verify, verifyAdmin, announcementController.deleteAnnouncementById);

module.exports = router;
