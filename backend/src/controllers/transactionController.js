const fetchAndSeedData = require('../services/thirdPartyAPI');
const Transaction = require('../models/Transaction');


const initializeDatabase = async (req, res) => {
    try {
        await fetchAndSeedData();
        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listTransactions = async (req, res) => {
    const { month, search, page = 1, perPage = 10 } = req.query;

    // Validate the month parameter and return status 400 if any of following is true
    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ error: "Invalid month parameter. Month must be a number between 1 and 12." });
    }
    const query = {};

    if (month) {
        query.$expr = { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] };
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
        ];
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        const total = await Transaction.countDocuments(query);

        res.status(200).json({
            transactions,
            total,
            page,
            perPage,
            totalPages: Math.ceil(total / perPage),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { initializeDatabase , listTransactions };