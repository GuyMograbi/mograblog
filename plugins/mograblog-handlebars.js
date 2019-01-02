var layouts = require('metalsmith-layouts')
var moment = require('moment')
// var _ = require('lodash')
module.exports = function (pages, metalsmith, done) {
  // console.log(pages);
  console.log('process.env.HOMEPAGE', typeof(process.env.HOMEPAGE));
  if (process.env.HOMEPAGE === 'true') {
    return layouts({
      engine: 'pug',
      pretty: true,
      moment: moment,
      pattern: '**/index.html',
      partials: 'layouts',

    })(pages, metalsmith, done)
  }
  // console.log('pages are', Object.keys(pages))
  layouts({engine: 'pug', pretty: true, moment: moment, partials: 'layouts'})(pages, metalsmith, done)
}
