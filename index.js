var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var users = require('./models/users');
/**
  *初始化服务器
  */
var server = restify.createServer({
    name: 'labWebsite',
    version: '1.0.0'
});

/**
  *引入插件
  */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(users)



var Note = mongoose.model('notes', userInfo);

var notes = restifyMongoose(users.Note);

// Serve resource notes with fine grained mapping control
server.get('/notes', notes.query());
server.get('/notes/:id', notes.detail());
server.post('/notes', notes.insert());
server.patch('/notes/:id', notes.update());
server.del('/notes/:id', notes.remove());


// Public route to serve angular.js app and html/js/css files
server.get(/.*/, restify.plugins.serveStatic({
  directory: 'public',
  default: 'index.html'
}));

server.listen(3000, function () {
  console.log('%s listening at %s. Point your browser to "%s/public/index.html" to see the angular UI in action!', server.name, server.url, server.url);
});