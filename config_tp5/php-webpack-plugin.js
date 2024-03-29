const url = require('url')
const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
const fs = require('fs')

function jsonToPhp(obj) {
  var json = JSON.stringify(obj)
  return json.replace(new RegExp('{', 'gm'), '[')
    .replace(new RegExp('}', 'gm'), ']')
    .replace(new RegExp(':', 'gm'), '=>')
    .replace(new RegExp('"', 'gm'), '\'') // 换成单引号提高效率
    .replace(new RegExp('##', 'gm'), ':') // 恢复冒号
}

function plugin({
  assetsMapPath,
  prodPath = '/dist/',
  devPath = 'http://localhost:8080/'
}) {
  plugin.assetsMapPath = assetsMapPath
  plugin.prodPath = prodPath
  plugin.devPath = devPath
}
plugin.prototype.apply = (compiler) => {
  compiler.hooks.done.tap('PhpWebpackPlugin', (stats) => {
    var entries = stats.toJson().entrypoints
    var js = {}
    var css = {}
    var p = devMode ? plugin.devPath : plugin.prodPath
    for (var k in entries) {
      var j = []
      var c = []
      entries[k].assets.forEach(e => {
        var a=url.resolve(p, e).replace(new RegExp(':','gm'),'##') // 保护冒号，以免jsonToPhp时丢失
        if (/\.js$/.test(e))
          j.push(a)
        else if (/\.css$/.test(e))
          c.push(a)
      });
      if (j.length > 0)
        //所有反斜杠转斜杆
        k = k.split("\\").join("\/")
        js[k] = j
      if (c.length > 0)
        css[k] = c
    }
    var map = {
      js: js,
      css: css
    }
    con = '<?php return ' + jsonToPhp(map) + ';'
    fs.writeFileSync(plugin.assetsMapPath, con)
  })
}

module.exports = plugin