const Url = require('../models/Url');

async function shortenUrl(req, res) {
	// https://deepakmodi.tech/ => https://bit.ly/46okdIC
	// 46okdIC => shortCode

	const { originalUrl } = req.body;
   	const shortCode = Math.random()       // 0.7834592847563
                        .toString(36)     // "0.s8w7xqp4zk"
                        .substring(2, 8); // "s8w7xq"

	try {
		const url = new Url({ originalUrl, shortCode });
		await url.save();
		res.status(201).json(url);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

async function redirectUrl(req, res) {
	const { shortCode } = req.params;

	try {
		const url = await Url.findOne({ shortCode });
		if (!url) return res.status(404).send('URL not found');

		url.clicks++;
		await url.save();

		res.redirect(url.originalUrl);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

async function getAllUrls(req, res) {
	try {
		const urls = await Url.find();
		res.status(200).json(urls);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}


module.exports = { getAllUrls, shortenUrl, redirectUrl };