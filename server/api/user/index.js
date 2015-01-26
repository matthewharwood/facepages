'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/', controller.index);
router.delete('/:id', controller.destroy);
router.get('/me', controller.me);
router.put('/:id/password', controller.changePassword);
router.get('/:id', controller.show);
router.get('/:id', controller.show);
router.post('/', controller.create);

module.exports = router;

//put auth.isAuthenticated() back in as the 2nd arg for gets/put, if necessary

