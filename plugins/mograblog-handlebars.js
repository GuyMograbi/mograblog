var handlebars = require('handlebars'),
  hbsLayouts = require('handlebars-layouts');
var layouts = require('metalsmith-layouts');

handlebars.registerHelper(hbsLayouts(handlebars));

handlebars.registerHelper('moment', function (context, format) {
  return moment(context).format(format)
});
handlebars.registerHelper('json', function (context) {
  if (!!context) {
    return Object.keys(context);
  } else {
    return 'null';
  }
});
handlebars.registerHelper('hbs', function (context) {
  return handlebars.compile(context)({});
});

module.exports = layouts({engine: 'handlebars', partials: 'layouts'})