const fs = require('fs');

let transactions = [];

try {
	transactions = JSON.parse(
		fs.readFileSync(`${__dirname}/../dev-data/transactions-simple.json`)
	);
} catch (e) {
	console.log(e);
	transactions = ['some trxs'];
}

exports.checkId = (req, res, next, val) => {
	next();
};

exports.checkBody = (req, res, next) => {
	if (!req.body.title || !req.body.value) {
		return res.status(400).json({
			status: 'fail',
			message: 'Missing title or value',
		});
	}
	next();
};

exports.getAllTrxs = (req, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		results: transactions.length,
		data: {
			transactions,
		},
	});
};

exports.getTrx = (req, res) => {
	const id = req.params.id;
	const transaction = transactions.find((el) => el.id === parseInt(id));

	res.status(200).json({
		status: 'success',
		data: {
			transaction,
		},
	});
};

exports.createTrx = (req, res) => {
	const newTrx = Object.assign(req.body);
	transactions.push(newTrx);

	console.log('createTrx');
	console.log(transactions);

	fs.writeFile(
		`${__dirname}/../dev-data/transactions-simple.json`,
		JSON.stringify(transactions, null, 4),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					transaction: newTrx,
				},
			});
		}
	);
};

exports.updateTrx = (req, res) => {
	const id = req.params.id;
	const transaction = transactions.find((el) => el.id === id);
	const updatedTrx = Object.assign(transaction, req.body);

	fs.writeFile(
		`${__dirname}/../dev-data/data/transactions-simple.json`,
		JSON.stringify(transactions, null, 4),
		(err) => {
			res.status(200).json({
				status: 'success',
				data: {
					transaction: updatedTrx,
				},
			});
		}
	);
};

exports.deleteTrx = (req, res) => {
	const id = req.params.id;
	console.log('transactions');
	console.log(transactions);
	const transaction = transactions.find((el) => {
		return el.id === parseInt(id);
	});
	let _transactions = [];
	transactions.forEach((el) => {
		if (el.id !== transaction.id) {
			_transactions.push(el);
		}
	});
	console.log('transactions');
	console.log(transactions);
	console.log('deleteTrx');
	console.log(req.params.id);
	console.log(transaction);
	fs.writeFile(
		`${__dirname}/../dev-data/transactions-simple.json`,
		JSON.stringify(Array.from(_transactions), null, 4),
		(err) => {
			res.status(204).json({
				status: 'success',
				data: null,
			});
		}
	);
	/* res.status(204).json({
		status: 'success',
		data: null,
	}); */
};
