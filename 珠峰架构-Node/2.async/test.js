"use strict";

function asyncGeneratorStep(gen,
    resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg); // it.next(arg)
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value); // 如果完成 直接走成功
    } else { // 如果没完成 把值包装成promoise  继续then
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function() {
        var self = this,
            args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); }
            _next(undefined);
        });
    };
}

function read() {
    return _read.apply(this, arguments);
}

function _read() {
    _read = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return readFile('./a.txt', 'utf8');

                    case 2:
                        data = _context.sent;
                        _context.next = 5;
                        return readFile(data, 'utf8');

                    case 5:
                        data = _context.sent;
                        return _context.abrupt("return", data);

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));
    return _read.apply(this, arguments);
}

// 最后我们会把回调的方式最终全部采用async + await
// 多个await 是串行 