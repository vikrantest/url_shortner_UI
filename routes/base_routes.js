var express = require('express');
var router = express.Router();

// Including controllers
var shurl_controller = require('../controllers/base_controller');

// router.post('/generate_shurl', shurl_controller.generate_shurl);
router.get('/', shurl_controller.indexShurl);
router.post('/generate-shurl', shurl_controller.generateshurl);

module.exports = router;

