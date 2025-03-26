const mongoose = require('mongoose');

// Updated to take a parameter name and return a middleware function
const validateMongoId = (paramName) => {
    return (req, res, next) => {
        const id = req.params[paramName];
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid MongoDB ID' });
        }
        next();
    };
};

module.exports = validateMongoId;