var ShortcodeParser = require('meta-shortcodes');
var _ = require('lodash')


var parsers = {
  'alert-info': function (pages, metalsmith, currentPage) {
    return function (opts, content) {
      return '<div class="content-entry alert alert-info alert-block">' + content + '</div>';
    }
  },
  'previous-post': function (pages, metalsmith, currentPage) {
    return function (opts, content) {

      return '<a href="' + currentPage.previous.path + '" title="' + currentPage.previous.title + '">' + content + '</a>';

    }
  }
};


module.exports = function (pages, metalsmith) {
  _.each(pages, function (page) {
    if (page.shortcodes) {
      var parser = new ShortcodeParser({
        openPattern: '\\[#',
        closePattern: '\\]'
      });
      _.each(parsers, function (p, name) {
        parser.add(name, p(pages, metalsmith, page))
      });
      page.contents = new Buffer(parser.parse(page.contents.toString()));
    }
  })
}