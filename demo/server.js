var path = require('path')
var fs = require('fs')

var express = require('express')
var app = express()

var isProduction = (process.env.NODE_ENV==='production') ? true : false
var IRIS_BA_VERSION = isProduction ? 'iris-ba.min.js' : 'iris-ba.js'

var irisBAScript = path.resolve( __dirname, '../dist', IRIS_BA_VERSION )

app.get('/iris-ba.js', (res,req)=>{
  res.sendFile( irisBAScript )
})

app.use(express.static( __dirname ))
app.use(express.static( path.resolve(__dirname, '../dist') ))

app.listen(8080, '0.0.0.0', ()=>{
  console.log('listening on port 8080')
})