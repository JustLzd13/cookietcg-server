const Announcement = require('../models/Announcement');

// Create a new announcement
module.exports.createAnnouncement = async (req, res) => {
  try {
    const { image, details } = req.body;
    const userId = req.user.id;

    const newAnnouncement = new Announcement({
      image,
      details,
      userId
    });

    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement created successfully", data: newAnnouncement });
  } catch (error) {
    res.status(500).json({ message: "Failed to create announcement", error: error.message });
  }
};

// Get all announcements
module.exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('userId', 'email username')
      .sort({ datePosted: -1 });

    res.status(200).json({ data: announcements });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch announcements", error: error.message });
  }
};

// Get a specific announcement by ID
module.exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('userId', 'email username');

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ data: announcement });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch announcement", error: error.message });
  }
};

// Update an announcement by ID
module.exports.updateAnnouncementById = async (req, res) => {
  try {
    const { image, details } = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { image, details },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement updated", data: updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ message: "Failed to update announcement", error: error.message });
  }
};

// Delete an announcement by ID
module.exports.deleteAnnouncementById = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete announcement", error: error.message });
  }
};
