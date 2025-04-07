const Selling = require('../models/Selling');

// Create a selling entry
module.exports.sellProduct = async (req, res) => {
    try {
        const { productImage, productName, details } = req.body;

        const newSelling = new Selling({
            userId: req.user.id, // assuming verify middleware sets req.user
            productImage,
            productName,
            details
        });

        const savedSelling = await newSelling.save();
        res.status(201).json({ message: 'Product listed for selling', selling: savedSelling });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create selling entry', details: error.message });
    }
};

// Get all selling entries
module.exports.getAllSelling = async (req, res) => {
    try {
        const sellings = await Selling.find();
        res.status(200).json(sellings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch selling entries', details: error.message });
    }
};

// Get a specific selling entry by ID
module.exports.getSellingById = async (req, res) => {
    try {
        const selling = await Selling.findById(req.params.id).populate('userId', 'firstName lastName email');

        if (!selling) {
            return res.status(404).json({ message: 'Selling entry not found' });
        }

        res.status(200).json(selling);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch selling entry', details: error.message });
    }
};

// Update a selling entry
module.exports.updateSellingById = async (req, res) => {
    try {
        const selling = await Selling.findById(req.params.id);

        if (!selling) {
            return res.status(404).json({ message: 'Selling entry not found' });
        }

        if (selling.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to update this entry' });
        }

        const { productImage, productName, details } = req.body;

        selling.productImage = productImage || selling.productImage;
        selling.productName = productName || selling.productName;
        selling.details = details || selling.details;

        const updatedSelling = await selling.save();
        res.status(200).json({ message: 'Selling entry updated', selling: updatedSelling });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update selling entry', details: error.message });
    }
};

// Delete a selling entry
module.exports.deleteSellingById = async (req, res) => {
    try {
        const selling = await Selling.findById(req.params.id);

        if (!selling) {
            return res.status(404).json({ message: 'Selling entry not found' });
        }

        if (selling.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this entry' });
        }

        await Selling.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Selling entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete selling entry', details: error.message });
    }
};
