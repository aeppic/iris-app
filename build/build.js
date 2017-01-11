const fs = require('fs')
const path = require('path')

const zlib = require('zlib')
const rollup = require('rollup')
const uglify = require('uglify-js')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

let builds = require('./config').getAllBuilds()

// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.dest.indexOf(f) > -1)
  })
}

build(builds)

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry (config) {
  
  const isProd = /min\.js$/.test(config.dest)

  return rollup.rollup(config).then(bundle => {

    const result = bundle.generate(config)
    var ops = [];

    var code = result.code

    if (isProd) {

      // var code = (config.banner ? config.banner + '\n' : '') +  minifiedResult.code

      var minifiedResult = uglify.minify(code, {
        fromString: true,
        output: {
          screw_ie8: true,
          ascii_only: true
        },
        comments: 'some',
        compress: {
          pure_funcs: ['makeMap']
        },
        sourceRoot: 'iris-ba',
        inSourceMap: JSON.parse( result.map.toString() ),
        outSourceMap: path.basename( config.dest ) + '.map'
      })

      var minified = minifiedResult.code // (config.banner ? config.banner + '\n' : '') +  minifiedResult.code

    // var code = (config.banner ? config.banner + '\n' : '') + result.code

      if(config.sourceMap){
        ops.push( write(config.dest + '.map', minifiedResult.map ) )
      }
      ops.push( write(config.dest, minified, true) )

      return Promise.all(ops)
    } else {

      if(config.sourceMap) {
        
        const embeddedSourceMap = true // Should emit both js files with and without embedded map

        if(embeddedSourceMap) {
          result.code += '\n//# sourceMappingURL=' + result.map.toUrl()
        } else {
          result.code += '\n//# sourceMappingURL=' + path.basename(config.dest) + '.map'
          ops.push( write(config.dest + '.map', result.map.toString() ) )
        }
      }
      
      ops.push( write(config.dest, result.code) )
    
      return Promise.all(ops)
    }
  })
}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
