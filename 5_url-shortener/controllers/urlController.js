   const Url = require('../models/Url');

   exports.shortenUrl = async (req, res) => {
   	const { originalUrl } = req.body;
   	const shortUrl = Math.random().toString(36).substring(2, 8);

   	try {
   		const url = new Url({ originalUrl, shortUrl });
   		await url.save();
   		res.status(201).json(url);
   	} catch (error) {
   		res.status(400).json({ error: error.message });
   	}
   };

   exports.redirectUrl = async (req, res) => {
   	const { shortUrl } = req.params;

   	try {
   		const url = await Url.findOne({ shortUrl });
   		if (!url) return res.status(404).send('URL not found');

   		url.clicks++;
   		await url.save();

   		res.redirect(url.originalUrl);
   	} catch (error) {
   		res.status(500).json({ error: error.message });
   	}
   };