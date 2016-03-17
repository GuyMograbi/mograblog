var path = require('path');
var _= require('lodash');
var dateformat = require('dateformat');
var fs = require('fs.extra');
var toMarkdown = require('to-markdown');




var content = require( path.join(__dirname,'data.json'));
var posts = _.filter(content.feed.entry, function(e){
    return !!_.find(e.category, { _term : 'http://schemas.google.com/blogger/2008/kind#post'})
});

function makeDir( p ){
    var published = new Date(p.published);
    published = dateformat(published,'yyyy_mm_dd');
    var dir = published.split('_').join('/')
    fs.mkdirpSync( dir );
    return dir;
}

function writePost( p ){
    if (p.content.__text ) {
        var dir = makeDir(p);
        var filename = _.kebabCase(p.title.__text) + '.md';
        fs.writeFileSync(path.join(__dirname, dir, filename), toMarkdown(p.content.__text));
    }

}

_.each(posts, writePost);
