var layouts = require('metalsmith-layouts');
var moment = require('moment');
module.exports = layouts({engine: 'pug', pretty:true, moment:moment, partials: 'layouts'})