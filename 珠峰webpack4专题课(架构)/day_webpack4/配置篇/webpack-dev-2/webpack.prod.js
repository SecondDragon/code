let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
   mode: 'production',
   optimization:{
     minimizer:[

     ]
   },
   plugins:[
     
   ]
})