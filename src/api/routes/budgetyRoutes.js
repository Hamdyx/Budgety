const express = require('express');

const {
	getAllTrxs,
	createTrx,
	getTrx,
	updateTrx,
	deleteTrx,
	checkId,
	checkBody,
} = require('../controllers/budgetyController');

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTrxs).post(checkBody, createTrx);

router.route('/:id').get(getTrx).patch(updateTrx).delete(deleteTrx);

module.exports = router;
