/**
 * a plugin to turn keyword into collection
 * 
 * opts = { collection: 'name of collection' , keyword : 'keyword to look for' }
 * 
 **/

var _ = require('lodash')
module.exports = function(opts){
  var opts = _.merge({},opts)
  return function (pages, metalsmith) {
    metalsmith._metadata.collections[opts.collection] = _.filter(metalsmith._metadata.collections.articles, function (a) {
      return a && a.keywords && a.keywords.indexOf(opts.keyword) >= 0;
    });
  } 
}
