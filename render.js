"use strict";

var marked = require("marked");
var Promise = require("bluebird");
var path = require("path");
var fs = Promise.promisifyAll(require("fs"));
var mkdirp = Promise.promisify(require("fs-extra").mkdirp);

fs.readdirAsync("2016")
  .map(renderFile);

function renderFile(filename) {
  return path.extname(filename) === ".md"
    ? renderHtmlFile(filename)
    : Promise.resolve();
}

function renderHtmlFile(filename) {
  var htmlFilename = path.join("2016", "html", path.basename(filename, ".md") + ".html");
  return mkdirp(path.resolve("2016/html"))
    .then(() => fs.readFileAsync(path.join("2016", filename), "utf-8"))
    .then(content =>
      fs.writeFileAsync(path.resolve(htmlFilename), marked(content))
    )
    .then(() => console.log(filename + " done."));
}
