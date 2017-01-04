'use strict';

var express = require('express');
var app = express();
var reqDir = require('require-dir');
var routes = reqDir(__dirname + '/routes');
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '64mb' }));

function routeMatch(req, route) {
  return route.method.toLowerCase() === req.method.toLowerCase() && route.path === req.path;
}

app.use(function (req, res, next) {
  var routeName = Object.keys(routes).find(function (key) {
    return routeMatch(req, routes[key].route);
  });
  if (!routeName) {
    return res.status(404).end();
  }
  var route = routes[routeName];

  var params = route.parameters(req);
  var response = void 0;
  try {
    response = route.controller(params);
  } catch (e) {
    return next(e);
  }
  // set cookie
  // set status
  res.send(response);
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(3003, console.log);