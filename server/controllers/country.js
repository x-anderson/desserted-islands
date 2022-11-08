const Country = require('../models/Country.js')

const getAllCountries = async (_, res, next) => {
    try {
     const allCountries = await Country
            .find({});

        res.status(200).json(allCountries);
    } catch (error) {
        next(error);
    }
}

module.exports = getAllCountries
