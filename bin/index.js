#!/usr/bin/env node
const utils = require('./utils')
const paths = require('path')
const pat = paths.resolve(__dirname, '../cache')
const program = require('commander')
const init = require('./init')
const clean = require('./clean')
const link = require('./link')
const static = require('./static')
const version = require("../package.json").version
/**
 * in the beginning ,clean cache
 */
utils.rmdirSync(paths.resolve(pat,'package'))

console.log(static.init)
program
  .version(version)

program
  .command('init [name]')
  .alias('i')
  .description('init the coir package')
  .option("-s, --save", "save the package to cache")
  .option("-c, --conf [value]", "read the coir_config.json ")
  .action((dir,options) => {
    let conf = false
    if(options.conf){
      conf = options.conf
    }
    init(dir,{cache:options.save?true:false,conf:conf})
  })

program
  .command('clean')
  .alias('c')
  .description('clean the cache')
  .action(()=>{
    clean()
  })

program
  .command('link')
  .alias('l')
  .description('link the coir package')
  .action(()=>{
    link()
  })

program.parse(process.argv)
