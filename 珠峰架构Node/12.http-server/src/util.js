const os =require('os');


function getIp(){
    let interfaces = os.networkInterfaces();
    interfaces = Object.values(interfaces).reduce((memo,current)=>{
        return memo.concat(current);
    },[]);
    let ip = interfaces.find(item=>{
        return item.family === 'IPv4' && item.cidr.startsWith('192')
    });
    return ip
}

this.getIp = getIp

