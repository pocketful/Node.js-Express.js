const express = require('express');

const pageRoutes = express.Router();
const controller = require('../controllers/pageControllers');

pageRoutes.get('/', controller.showHomePage);
pageRoutes.get('/about', controller.showAboutPage);
pageRoutes.get('/contacts', controller.showContactsPage);
pageRoutes.get('/users', controller.showUsersPage);
pageRoutes.get('/posts', controller.showPostsPage);

module.exports = pageRoutes;
