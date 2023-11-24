const express = require('express');
const router = express.Router();

const apiRouter = require('./api/APIRoutes');
const frontendRouter = require('./frontend/FrontendRoutes');


router.use('/api', apiRouter);
router.use(frontendRouter);



module.exports = router;