const EventEmitter = require('events');
const fs = require('fs');
const Queue = require('./queue')
class WriteStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16 * 1024;

        this.len = 0; // 用于维持有多少数据没有被写入到文件中的
        this.needDrain = false;
        this.cache = new Queue();
        this.writing = false; // 用于标识是否是第一次写入
        this.offset = this.start; // 偏移量
        this.open();
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            this.fd = fd;
            this.emit('open', fd)
        })
    }
    clearBuffer() { // 先写入成功后 调用clearBuffer -》 写入缓存的第一个，第一个完成后，在继续第二个
        let data = this.cache.poll();
        if (data) {
            this._write(data.chunk, data.encoding, data.cb);
        } else {
            this.writing = false;
            if (this.needDrain) {
                this.emit('drain')
            }
        }
    }
    // 切片编程
    write(chunk, encoding = this.encoding, cb = () => {}) { // Writable 类中的
        // 1.将数据全部转化成buffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        let returnValue = this.len < this.highWaterMark;
        // 当数据写入后 需要在手动的将 this.len--;
        this.needDrain = !returnValue;
        let userCb = cb;
        cb = () => {
            userCb();
            this.clearBuffer(); // 清空缓存逻辑
        }
        // 此时我需要 判断你是第一次给我的，还是不是第一次
        if (!this.writing) {
            // 当前没有正在写入说明是第一次的
            // 需要真正执行写入的操作
            this.writing = true;
            this._write(chunk, encoding, cb);
        } else {
            this.cache.offer({
                chunk,
                encoding,
                cb
            });
        }
        return returnValue
    }
    _write(chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            this.offset += written; // 维护偏移量
            this.len -= written; // 把缓存的个数减少
            cb(); // 写入成功了
        });
    }
}
module.exports = WriteStream
// 自己实现一个事件环的基础模型 ， 为前端中singleSpa  就是一个事件环模型