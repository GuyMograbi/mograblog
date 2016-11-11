var _ = require('lodash')
var logger = require('log4js').getLogger('ensure-formatter')

/**
 * plugin that ensures fields exist in frontmatter
 * @param opts
 * @returns {ensureFrontmatter}
 */

module.exports = function ensureFrontmatterFactory (opts) {
  opts = _.merge({
    filter: function (p) {
      return p.filepath.indexOf('posts/') === 0
    },
    fields: ['title', 'keywords', 'description']
  })
  return function ensureFrontmatter (pages, metalsmith) { // fix for 'collection' uniqueness... happens when combined with 'watch'
    var p = _.find(_.filter(metalsmith._metadata.collections.pages, opts.filter), function (page) {
      return !!_.find(opts.fields, function (field) {
        if (!_.has(page, field)) {
          logger.error('page ', page.filepath, 'is missing field', field)
          return true
        }
      })
    })
    if (p) {
      throw new Error('page ' + p.filepath + ' is missing some details')
    }
  }
}
