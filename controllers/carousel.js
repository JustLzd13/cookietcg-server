const Carousel = require('../models/Carousel');

// Create a new carousel item (userId from token)
module.exports.createCarouselItem = async (req, res) => {
  try {
    const { imageNews } = req.body;
    const userId = req.user.id;

    const newCarousel = new Carousel({
      imageNews,
      userId,
    });

    await newCarousel.save();
    res.status(201).json({ message: "Carousel item created successfully", data: newCarousel });
  } catch (error) {
    res.status(500).json({ message: "Failed to create carousel item", error: error.message });
  }
};

// Get all carousel items
module.exports.getAllCarouselItems = async (req, res) => {
  try {
    const items = await Carousel.find().populate('userId', 'email username');

    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carousel items", error: error.message });
  }
};

// Get a specific carousel item by ID
module.exports.getCarouselItemById = async (req, res) => {
  try {
    const item = await Carousel.findById(req.params.id)
      .populate('userId', 'email username');

    if (!item) return res.status(404).json({ message: "Carousel item not found" });

    res.status(200).json({ data: item });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carousel item", error: error.message });
  }
};

// Update a carousel item by ID
module.exports.updateCarouselItemById = async (req, res) => {
  try {
    const { imageNews } = req.body;

    const updatedItem = await Carousel.findByIdAndUpdate(
      req.params.id,
      { imageNews },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ message: "Carousel item not found" });

    res.status(200).json({ message: "Carousel item updated", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to update carousel item", error: error.message });
  }
};

// Delete a carousel item by ID
module.exports.deleteCarouselItemById = async (req, res) => {
  try {
    const deletedItem = await Carousel.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Carousel item not found" });

    res.status(200).json({ message: "Carousel item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete carousel item", error: error.message });
  }
};
