const Transaction = require('../models/Transaction');

const getStatisticsData = async (month) => {
    const totalSaleAmount = await Transaction.aggregate([
        { $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }, sold: true } },
        { $group: { _id: null, total: { $sum: '$price' } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
        $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
        sold: true,
    });

    const totalNotSoldItems = await Transaction.countDocuments({
        $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
        sold: false,
    });

    return {
        totalSaleAmount: totalSaleAmount[0]?.total || 0,
        totalSoldItems,
        totalNotSoldItems,
    };
};

const getBarChartData = async (month) => {
    const ranges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Infinity },
    ];

    const barChartData = await Promise.all(
        ranges.map(async (range) => {
            const count = await Transaction.countDocuments({
                $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
                price: { $gte: range.min, $lte: range.max },
            });
            return { range: `${range.min}-${range.max}`, count };
        })
    );

    return barChartData;
};

const getPieChartData = async (month) => {
    const pieChartData = await Transaction.aggregate([
        { $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    return pieChartData;
};

const getCombinedData = async (req, res) => {
    const { month } = req.body;

    try {
        const [statistics, barChartData, pieChartData] = await Promise.all([
            getStatisticsData(month),
            getBarChartData(month),
            getPieChartData(month),
        ]);

        console.log("stat",statistics,"bar",barChartData,"pie",pieChartData)
        res.status(200).json({
            statistics,
            barChartData,
            pieChartData,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getStatistics: async (req, res) => {
        const { month } = req.params;
        const data = await getStatisticsData(month);
        res.status(200).json(data);
    },
    getBarChartData: async (req, res) => {
        const { month } = req.params;
        const data = await getBarChartData(month);
        res.status(200).json(data);
    },
    getPieChartData: async (req, res) => {
        const { month } = req.params;
        const data = await getPieChartData(month);
        res.status(200).json(data);
    },
    getCombinedData,
};