const express = require('express');
const { initializeDatabase, listTransactions } = require('../controllers/transactionController');
const { getStatistics, getBarChartData, getPieChartData, getCombinedData } = require('../controllers/statsController');

const router = express.Router();

router.get('/initialize-database', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);
router.get('/combined-data', getCombinedData);

module.exports = router;