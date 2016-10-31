'use strict';

var Metalsmith = require('metalsmith');
var sitemap = require('metalsmith-sitemap');
var markdown = require('metalsmith-markdown');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var path = require('path');
var drafts = require('metalsmith-drafts');
var _ = require('lodash');
var moment = require('moment');
var excerpts = require('metalsmith-excerpts');

var moveUp = require('metalsmith-move-up');
var blc = require('metalsmith-broken-link-checker');
var changed = require('metalsmith-changed');
var rss = require('metalsmith-rss');
var fs = require('fs-extra');

// free up the port before we start the server.. 
require('kill-by-port').killByPort(3000)

var app = new Metalsmith(__dirname)
    .clean(false)
    .use(drafts())
    .use(function (pages, metalsmith) {
      //console.log(metalsmith.collections);
      metalsmith._metadata = {};
      _.each(pages, function (p, filepath) {

        p.filepath = filepath;
      });
      //metalsmith.collections.articles = null;
    })

    .use(collections({
      articles: {
        pattern: 'posts/**/*.md',
        sortBy: function (a, b) {
          return new Date(b.published) - new Date(a.published);
        },
        reverse: false
      },
      pages: {
        pattern: '**/*.md'
      },
      drafts: {
        pattern: 'drafts/posts/**/*.md'
      }

    }))
    .use(require('./plugins/my-sort'))
    .use(function (pages) {
      _.each(pages, function (p, path) {
        p.path = '/' + path.replace(/\.md$/, '.html');
        if (p.path.indexOf('/posts') === 0) {
          p.path = p.path.substring('/posts'.length);
          p.url = p.path;
        }
      });
    })
    .use(require('./plugins/ensure-frontmatter')({}))
    .use(require('./plugins/keyword-collection')({keyword:'javascript', collection:'javascriptArticles'}))
    .use(require('./plugins/shortcodes-parsers'))
    .use(markdown())
    .use(excerpts())
    .use(moveUp('posts/**'))

    .use(require('./plugins/mograblog-handlebars'))
    .use(sass())
    .use(blc())
    .use(rss({
      collection: 'articles',
      feedOptions: {
        title: 'Mograblog',
        site_url: 'http://www.mograblog.com'
      }
    }))
    .use(rss({
      collection: 'javascriptArticles',
      destination: 'javascript-rss.xml',
      feedOptions: {
        title: 'Mograblog',
        site_url: 'http://www.mograblog.com'

      }
    }))
  .use(sitemap({hostname: 'http://www.mograblog.com', pattern: ['**/*.html','!*.html','!**/drafts/**/*.html','!**/fonts/**/*.html']}))
    .use(function (pages, metalsmith) {
      fs.copySync('bower_components', path.join(metalsmith._destination, 'bower_components'));
    })

//.use(function(pages, metalsmith){
//    var articles = _.filter(pages,{'collection' : ['articles']});
//    console.log(articles);
//    var str = _.map(articles, function(a){
//        return '<a href="' + a.path + '">' + a.title + '</a>';
//    }).join('<br/>');
//
//    pages['index.html'] = {
//        contents : new Buffer(str)
//    };
//})

  ;

if (module.parent) {
  module.exports = app
} else {
  app.build(function (err) {
    if (err) throw err
  })
}
