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
    const { month, search, page = 1, perPage = 10 } = req.body;
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