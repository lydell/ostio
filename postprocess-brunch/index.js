var fs   = require("fs")
var path = require("path")
var zlib = require("zlib")

var stringify = require("json-stringify-pretty-compact")
var convert   = require("convert-source-map-simple")

function Postprocess(config) {
  this.config = config
}

Postprocess.prototype.brunchPlugin = true

Postprocess.prototype.onCompile = function(files) {
  var filePaths = files.map(function(file) { return file.path })

  filePaths.forEach(function(filePath) {
    var map = JSON.parse(fs.readFileSync(filePath + ".map").toString())
    delete map.sourcesContent
    fs.writeFileSync(filePath + ".map", JSON.stringify(map))

    var simpleMap = convert(map)
    fs.writeFileSync(filePath + ".simple.map", JSON.stringify(simpleMap))
    fs.writeFileSync(filePath + ".simple.pretty.map", stringify(simpleMap))
  })

  var public = this.config.paths.public
  fs.readdirSync(public)
    .filter(function(filePath) { return path.extname(filePath) !== ".gz" })
    .map(function(filePath) { return path.join(public, filePath) })
    .forEach(function(filePath) {
      fs.createReadStream(filePath)
        .pipe(zlib.createGzip({level: zlib.Z_BEST_COMPRESSION}))
        .pipe(fs.createWriteStream(filePath + ".gz"))
    })

}

module.exports = Postprocess
