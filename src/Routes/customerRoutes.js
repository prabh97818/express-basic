const express = require("express")
const customerRoutes = express.Router();
const CustomerController = require('../Controllers/customerController.js')


customerRoutes.get('/customers/list', CustomerController.getList);
customerRoutes.get('/customers', CustomerController.getCustomers);


module.exports = customerRoutes