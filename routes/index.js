var express = require('express');
var router = express.Router();

var soundifyController = require('../controllers/soundify_controller');

router.get('/', soundifyController.new);
router.post('/', soundifyController.create);
//router.get('/:Id(\\d+)', soundifyController.show);
router.get('/:link', soundifyController.show);

module.exports = router;
