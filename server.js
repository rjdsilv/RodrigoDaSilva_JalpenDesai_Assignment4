// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Gets the necessary packages.
const mongoose = require('./config/mongoose');
const senecaWeb = require('seneca-web')
const express = require('express')
const router = express.Router
const context = new router();

// Configures seneca web integration with express.
const senecaWebConfig = {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false }
};

// Opens a mongoose connection with the DB
mongoose();

// Configures express integration with seneca.
express()
    .use(require('body-parser').json())
    .use(context)
    .listen(3000);

// Configures seneca to listen using tcp for course messages and exposes its APIs.
require('seneca')()
    .use(senecaWeb, senecaWebConfig)
    .use('app/plugins/course.plugin')
    .listen({ type: 'tcp', pin: 'role:course' })
    .use('app/apis/course.api')
    .client({ type: 'tcp', pin: 'role:course' });
