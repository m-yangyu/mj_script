const router = require('koa-router')();
const PluginsController = require('../controller/plugins');

router.get('/getPlugins', PluginsController.getPlugins);
router.get('/download/:choose', PluginsController.downLoadPlugin);

module.exports = router;