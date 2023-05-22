const EventEmitter = require('events');
const fs = require('fs')
class ReadStream extends EventEmitter{
    constructor(path, options = {}) {
        super();
        // 放在实例上
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end;
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.flowing = false; // pause resume
        this.open(); // 文件打开操作 注意这个方法是异步的
        // 注意用户监听了data事件 才需要读取
        this.on('newListener',function (type) {
            if(type === 'data'){
                this.flowing = true;
                this.read();
            }
        })
        this.offset = this.start; // 默认start = offset
    }
    resume(){
        if(!this.flowing){
            this.flowing = true;
            this.read();
        }
    }
    pause(){
        this.flowing = false;
    }
    read(){ // once events模块中的绑定一次
        // 希望在open之后才能拿到fd 
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this.read())
        }
        let howMutchToRead = this.end ? Math.min(this.end - this.offset + 1  , this.highWaterMark) :  this.highWaterMark;
        const buffer = Buffer.alloc(howMutchToRead);
        // 读取文件中内容，每次读取this.highWaterMark个
        // 123   4
        fs.read(this.fd,buffer,0,howMutchToRead,this.offset,(err,bytesRead)=>{
            if(bytesRead){
                this.offset += bytesRead;
                this.emit('data',buffer.slice(0,bytesRead));
                if(this.flowing){ // 用于看是否递归读取
                    this.read();
                }
            }else{
                this.emit('end');
                this.destroy();
            }
        })
    }
    destroy(err){
        if(err){
            this.emit('error',err);
        }
        if(this.autoClose){
            fs.close(this.fd,()=> this.emit('close'))
        }
    }
    open() {
        fs.open(this.path, this.flags, (err,fd) => {
            if(err){
                return this.destroy(err)
            }
            this.fd = fd;
            this.emit('open',fd)
        })
    }



}

module.exports = ReadStream