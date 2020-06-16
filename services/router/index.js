const router = require('koa-router')();
const PluginsController = require('../controller/plugins');

router.get('/getPlugins', PluginsController.getPlugins);
router.get('/download', PluginsController.downLoadPlugin);

module.exports = router;