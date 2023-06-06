import(/* webpackPreload: true */'./preload.js').then((result)=>{
    console.log(result.default);
});
import(/* webpackPrefetch: true */'./prefetch.js').then((result)=>{
    console.log(result.default);
});

