'use strict'

var Metalsmith = require('metalsmith')
var sitemap = require('metalsmith-sitemap')
var markdown = require('metalsmith-markdown')
var sass = require('metalsmith-sass')
var collections = require('metalsmith-collections')
var path = require('path')
var drafts = require('metalsmith-drafts')
var _ = require('lodash')
const marked = require('marked');
var excerpts = require('metalsmith-excerpts')

var timer = require('metalsmith-timer')

var moveUp = require('metalsmith-move-up')
var blc = require('metalsmith-broken-link-checker')
var rss = require('metalsmith-rss')
var fs = require('fs-extra')
var mograblogHandlebars = require('./plugins/mograblog-handlebars')

// free up the port before we start the server..
// require('kill-by-port').killByPort(3000)
var modifiedFiles = null

var app = new Metalsmith(__dirname)
  .clean(false)
  .use(timer('init'))
  .use((pages) => { // remove all pages but what we need
    if (modifiedFiles !== null && modifiedFiles !== false) {
      console.log('modified files are', modifiedFiles)
      _.each(pages, (page, filepath) => {
        if (modifiedFiles.indexOf(filepath) < 0 &&
          filepath.indexOf('.md') > 0 &&
          filepath.indexOf('index.md') < 0) {
          delete pages[filepath]
        }
      })
    }
  })
  .use(timer('remove unmodified'))
  .use(drafts())
  .use(timer('drafts'))
  .use(function addFilepath (pages, metalsmith) {
    // console.log(metalsmith.collections)
    metalsmith._metadata = {}
    _.each(pages, function (p, filepath) {
      p.filepath = filepath
    })
    // metalsmith.collections.articles = null
  })
  .use(timer('addFilePath'))
  .use(collections({
    articles: {
      pattern: 'posts/**/*.md',
      sortBy: function (a, b) {
        return new Date(b.published) - new Date(a.published)
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

  .use(timer('collections'))
  .use(require('./plugins/my-sort'))
  .use(function (pages) {
    _.each(pages, function (p, path) {
      p.path = '/' + path.replace(/\.md$/, '.html')
      if (p.path.indexOf('/posts') === 0) {
        p.path = p.path.substring('/posts'.length)
        p.url = p.path
      }
    })
  })
  .use(require('./plugins/ensure-frontmatter')({}))
  .use(timer('ensure-frontmatter'))
  .use(require('./plugins/keyword-collection')({keyword: 'javascript', collection: 'javascriptArticles'}))
  .use(timer('keyword'))
  .use(require('./plugins/shortcodes-parsers'))
  .use(timer('shortcodes'))
  .use(markdown({
            "smartypants": true,
            "smartLists": true,
            "gfm": true,
            "tables": true,
            "breaks": false,
            "sanitize": false
        }))
  .use(timer('markdown'))
  .use(require('metalsmith-headings-identifier')())
  .use(timer('headings-identifier'))
  .use(excerpts())
  .use(timer('excerpts'))
  .use(moveUp('posts/**'))
  .use(timer('move-up'))
  .use(mograblogHandlebars)

  .use(timer('handlebars'))
  .use(sass())
  .use(timer('sass'))
if (process.env.BLC) {
  app.use(blc())
    .use(timer('blc'))
}
app.use(function (pages, metalsmith, done) {
  const metadata = metalsmith.metadata()

  if (!!metadata.collections && !!metadata.collections.articles && metadata.collections.articles.length > 0) {
    rss({
      collection: 'articles',
      feedOptions: {
        title: 'Mograblog',
        site_url: 'http://www.mograblog.com'
      }
    })(pages, metalsmith, done)
  } else {
    done()
  }
})
  .use(timer('rss-all'))
  .use(function (pages, metalsmith, done) {
    const metadata = metalsmith.metadata()

    if (!!metadata.collections && metadata.collections.javascriptArticles && metadata.collections.javascriptArticles.length > 0) {
      rss({
        collection: 'javascriptArticles',
        destination: 'javascript-rss.xml',
        feedOptions: {
          title: 'Mograblog',
          site_url: 'http://www.mograblog.com'

        }
      })(pages, metalsmith, done)
    } else {
      done()
    }
  })
  .use(timer('rss-javascript'))
  .use(function (pages, metalsmith, done) {
    if (modifiedFiles === null) {
      sitemap({
        hostname: 'http://www.mograblog.com',
        pattern: ['**/*.html', '!*.html', '!**/drafts/**/*.html', '!**/fonts/**/*.html']
      })(pages, metalsmith, done)
    } else {
      done()
    }
  })
  .use(timer('sitemap'))
  .use(function (pages, metalsmith) {
    if (modifiedFiles === null) {
      fs.copySync('bower_components', path.join(metalsmith._destination, 'bower_components'))
    }
  })
  .use(timer('copy'))

function buildApp () {
  app.build((err) => {
    if (err) throw err
    if ( modifiedFiles !== null ){
      modifiedFiles = []
    }
  })
}

if (!process.env.WATCH) {
  buildApp()
} else {
  var chokidar = require('chokidar')
  var triggerBuild = () => {
    modifiedFiles = _(modifiedFiles)
      .map((f) => { // metalsmith expects paths to be relative to src folder
        return path.relative(path.join(__dirname, 'src'), f)
      }).value()
    if (modifiedFiles.length > 0) { // don't trigger build if nothing changed and watching
      buildApp()
    }
  }

  var watcher = chokidar.watch(['src', 'layouts', 'partials', 'plugins'])
  var triggerBuildDebounced = _.debounce(triggerBuild, 100)
  watcher.on('change', (file) => {
    if (modifiedFiles === null) {
      modifiedFiles = []
    }
    modifiedFiles.push(file)
    triggerBuildDebounced()
  })
}
