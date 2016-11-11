var path = require('path')
var _ = require('lodash')
var dateformat = require('dateformat')
var fs = require('fs.extra')
var toMarkdown = require('to-markdown')

var content = require(path.join(__dirname, 'data.json'))
var posts = _.filter(content.feed.entry, function (e) {
  return !!_.find(e.category, {_term: 'http://schemas.google.com/blogger/2008/kind#post'})
})

function objToFrontmatter (obj) {
  return '---\n' + _.map(obj,
      function (v, k) {
        return k + ': ' + v
      }).join('\n') + '\n---\n'
}

function makeDir (p) {
  var published = new Date(p.published)
  published = dateformat(published, 'yyyy_mm_dd')
  var dir = published.split('_').join('/')
  fs.mkdirpSync(dir)
  return dir
}
var printed = false
function getFileContent (p) {
  if (!printed) {
    console.log(p)
    printed = true
  }
  // build metadata
  var metadata = objToFrontmatter({
    title: p.title.__text,
    published: p.published
  })
  // build post content
  var content = toMarkdown(p.content.__text)

  return metadata + '\n' + content
}

function writePost (p) {
  if (p.content.__text) {
    var dir = makeDir(p)
    var filename = _.kebabCase(p.title.__text) + '.md'
    fs.writeFileSync(path.join(__dirname, dir, filename), getFileContent(p))
  }
}

_.each(posts, writePost)
