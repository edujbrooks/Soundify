var models = require('../models/models.js');
var sanitizeHtml = require('sanitize-html');

//GET /
exports.new = function(req, res) {
	var soundify = models.soundify.build(
		{title: "title",
		link: "link",
		videoType: "videoType",
		videoURL: "videoURL",
		videoSeconds: "videoSeconds",
		soundType: "soundType",
		soundURL: "soundURL",
		soundSeconds: "soundSeconds"}
	);
  res.render('index', { soundify: soundify });
};

// POST /
exports.create = function(req, res) {
	req.body.soundify.videoURL = sanitizeHtml(req.body.soundify.videoURL,{
		allowedTags: [],
		allowedAttributes: []
	});

	var soundify = models.soundify.build(req.body.soundify);
	soundify.save({fields: ["title","link","videoType","videoURL","videoSeconds","soundType","soundURL","soundSeconds"]}).then( function () {
		res.redirect('/' + req.body.soundify.link);
	});
};

// GET (substring)
exports.show = function(req, res) {
	models.soundify.find({where: {link: req.params.link}}).then(function(soundify) {
		res.render('show', { soundify: soundify, errors: []});
	})
};
