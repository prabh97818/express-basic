const express = require("express")
const router = express.Router();
const customerRoutes = require('./customerRoutes.js')

router.use(customerRoutes)

module.exports = router;