// 延迟函数
const delay = function delay(interval) {
    typeof interval !== "number" ? interval = 1000 : null;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

/* 基于FORM-DATA实现文件上传 */
(function () {
    let upload = document.querySelector('#upload1'),
        upload_inp = upload.querySelector('.upload_inp'),
        upload_button_select = upload.querySelector('.upload_button.select'),
        upload_button_upload = upload.querySelector('.upload_button.upload'),
        upload_tip = upload.querySelector('.upload_tip'),
        upload_list = upload.querySelector('.upload_list');
    let _file = null;

    // 上传文件到服务器
    const changeDisable = flag => {
        if (flag) {
            upload_button_select.classList.add('disable');
            upload_button_upload.classList.add('loading');
            return;
        }
        upload_button_select.classList.remove('disable');
        upload_button_upload.classList.remove('loading');
    };
    upload_button_upload.addEventListener('click', function () {
        if (upload_button_upload.classList.contains('disable') || upload_button_upload.classList.contains('loading')) return;
        if (!_file) {
            alert('请您先选择要上传的文件~~');
            return;
        }
        changeDisable(true);
        // 把文件传递给服务器：FormData / BASE64
        let formData = new FormData();
        formData.append('file', _file);
        formData.append('filename', _file.name);
        instance.post('/upload_single', formData).then(data => {
            if (+data.code === 0) {
                alert(`文件已经上传成功~~,您可以基于 ${data.servicePath} 访问这个资源~~`);
                return;
            }
            return Promise.reject(data.codeText);
        }).catch(reason => {
            alert('文件上传失败，请您稍后再试~~');
        }).finally(() => {
            clearHandle();
            changeDisable(false);
        });
    });

    // 移除按钮的点击处理
    const clearHandle = () => {
        _file = null;
        upload_tip.style.display = 'block';
        upload_list.style.display = 'none';
        upload_list.innerHTML = ``;
    };
    upload_list.addEventListener('click', function (ev) {
        let target = ev.target;
        if (target.tagName === "EM") {
            // 点击的是移除按钮
            clearHandle();
        }
    });

    // 监听用户选择文件的操作
    upload_inp.addEventListener('change', function () {
        // 获取用户选中的文件对象
        //   + name：文件名
        //   + size：文件大小 B
        //   + type：文件的MIME类型
        let file = upload_inp.files[0];
        if (!file) return;

        // 限制文件上传的格式「方案一」
        /* if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
            alert('上传的文件只能是 PNG/JPG/JPEG 格式的~~');
            return;
        } */

        // 限制文件上传的大小
        if (file.size > 2 * 1024 * 1024) {
            alert('上传的文件不能超过2MB~~');
            return;
        }

        _file = file;

        // 显示上传的文件
        upload_tip.style.display = 'none';
        upload_list.style.display = 'block';
        upload_list.innerHTML = `<li>
            <span>文件：${file.name}</span>
            <span><em>移除</em></span>
        </li>`;
    });

    // 点击选择文件按钮，触发上传文件INPUT框选择文件的行为
    upload_button_select.addEventListener('click', function () {
        if (upload_button_select.classList.contains('disable') || upload_button_select.classList.contains('loading')) return;
        upload_inp.click();
    });
})();

/* 基于BASE64实现文件上传 */
(function () {
    let upload = document.querySelector('#upload2'),
        upload_inp = upload.querySelector('.upload_inp'),
        upload_button_select = upload.querySelector('.upload_button.select');

    // 验证是否处于可操作性状态
    const checkIsDisable = element => {
        let classList = element.classList;
        return classList.contains('disable') || classList.contains('loading');
    };

    // 把选择的文件读取成为BASE64
    const changeBASE64 = file => {
        return new Promise(resolve => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = ev => {
                resolve(ev.target.result);
            };
        });
    };

    upload_inp.addEventListener('change', async function () {
        let file = upload_inp.files[0],
            BASE64,
            data;
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('上传的文件不能超过2MB~~');
            return;
        }
        upload_button_select.classList.add('loading');
        BASE64 = await changeBASE64(file);
        try {
            data = await instance.post('/upload_single_base64', {
                file: encodeURIComponent(BASE64),
                filename: file.name
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (+data.code === 0) {
                alert(`恭喜您，文件上传成功，您可以基于 ${data.servicePath} 地址去访问~~`);
                return;
            }
            throw data.codeText;
        } catch (err) {
            alert('很遗憾，文件上传失败，请您稍后再试~~');
        } finally {
            upload_button_select.classList.remove('loading');
        }
    });
    upload_button_select.addEventListener('click', function () {
        if (checkIsDisable(this)) return;
        upload_inp.click();
    });
})();

/* 文件缩略图 & 自动生成名字 */
(function () {
    let upload = document.querySelector('#upload3'),
        upload_inp = upload.querySelector('.upload_inp'),
        upload_button_select = upload.querySelector('.upload_button.select'),
        upload_button_upload = upload.querySelector('.upload_button.upload'),
        upload_abbre = upload.querySelector('.upload_abbre'),
        upload_abbre_img = upload_abbre.querySelector('img');
    let _file = null;

    // 验证是否处于可操作性状态
    const checkIsDisable = element => {
        let classList = element.classList;
        return classList.contains('disable') || classList.contains('loading');
    };

    // 把选择的文件读取成为BASE64
    const changeBASE64 = file => {
        return new Promise(resolve => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = ev => {
                resolve(ev.target.result);
            };
        });
    };
    const changeBuffer = file => {
        return new Promise(resolve => {
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = ev => {
                let buffer = ev.target.result,
                    spark = new SparkMD5.ArrayBuffer(),
                    HASH,
                    suffix;
                spark.append(buffer);
                HASH = spark.end();
                suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
                resolve({
                    buffer,
                    HASH,
                    suffix,
                    filename: `${HASH}.${suffix}`
                });
            };
        });
    };

    // 把文件上传到服务器
    const changeDisable = flag => {
        if (flag) {
            upload_button_select.classList.add('disable');
            upload_button_upload.classList.add('loading');
            return;
        }
        upload_button_select.classList.remove('disable');
        upload_button_upload.classList.remove('loading');
    };
    upload_button_upload.addEventListener('click', async function () {
        if (checkIsDisable(this)) return;
        if (!_file) {
            alert('请您先选择要上传的文件~~');
            return;
        }
        changeDisable(true);
        // 生成文件的HASH名字
        let {
            filename
        } = await changeBuffer(_file);
        let formData = new FormData();
        formData.append('file', _file);
        formData.append('filename', filename);
        instance.post('/upload_single_name', formData).then(data => {
            if (+data.code === 0) {
                alert(`文件已经上传成功~~,您可以基于 ${data.servicePath} 访问这个资源~~`);
                return;
            }
            return Promise.reject(data.codeText);
        }).catch(reason => {
            alert('文件上传失败，请您稍后再试~~');
        }).finally(() => {
            changeDisable(false);
            upload_abbre.style.display = 'none';
            upload_abbre_img.src = '';
            _file = null;
        });
    });


    // 文件预览，就是把文件对象转换为BASE64，赋值给图片的SRC属性即可
    upload_inp.addEventListener('change', async function () {
        let file = upload_inp.files[0],
            BASE64;
        if (!file) return;
        _file = file;
        upload_button_select.classList.add('disable');
        BASE64 = await changeBASE64(file);
        upload_abbre.style.display = 'block';
        upload_abbre_img.src = BASE64;
        upload_button_select.classList.remove('disable');
    });
    upload_button_select.addEventListener('click', function () {
        if (checkIsDisable(this)) return;
        upload_inp.click();
    });
})();

/* 进度管控 */
(function () {
    let upload = document.querySelector('#upload4'),
        upload_inp = upload.querySelector('.upload_inp'),
        upload_button_select = upload.querySelector('.upload_button.select'),
        upload_progress = upload.querySelector('.upload_progress'),
        upload_progress_value = upload_progress.querySelector('.value');

    // 验证是否处于可操作性状态
    const checkIsDisable = element => {
        let classList = element.classList;
        return classList.contains('disable') || classList.contains('loading');
    };

    upload_inp.addEventListener('change', async function () {
        let file = upload_inp.files[0],
            data;
        if (!file) return;
        upload_button_select.classList.add('loading');
        try {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('filename', file.name);
            data = await instance.post('/upload_single', formData, {
                // 文件上传中的回调函数 xhr.upload.onprogress
                onUploadProgress(ev) {
                    let {
                        loaded,
                        total
                    } = ev;
                    upload_progress.style.display = 'block';
                    upload_progress_value.style.width = `${loaded/total*100}%`;
                }
            });
            if (+data.code === 0) {
                upload_progress_value.style.width = `100%`;
                await delay(300);
                alert(`恭喜您，文件上传成功，您可以基于 ${data.servicePath} 访问该文件~~`);
                return;
            }
            throw data.codeText;
        } catch (err) {
            alert('很遗憾，文件上传失败，请您稍后再试~~');
        } finally {
            upload_button_select.classList.remove('loading');
            upload_progress.style.display = 'none';
            upload_progress_value.style.width = `0%`;
        }
    });

    upload_button_select.addEventListener('click', function () {
        if (checkIsDisable(this)) return;
        upload_inp.click();
    });
})();

/* 多文件上传 */
(function () {
    let upload = document.querySelector('#upload5'),
        upload_inp = upload.querySelector('.upload_inp'),
        upload_button_select = upload.querySelector('.upload_button.select'),
        upload_button_upload = upload.querySelector('.upload_button.upload'),
        upload_list = upload.querySelector('.upload_list');
    let _files = [];

    // 验证是否处于可操作性状态
    const checkIsDisable = element => {
        let classList = element.classList;
        return classList.contains('disable') || classList.contains('loading');
    };

    // 把文件上传到服务器
    const changeDisable = flag => {
        if (flag) {
            upload_button_select.classList.add('disable');
            upload_button_upload.classList.add('loading');
            return;
        }
        upload_button_select.classList.remove('disable');
        upload_button_upload.classList.remove('loading');
    };
    upload_button_upload.addEventListener('click', async function () {
        if (checkIsDisable(this)) return;
        if (_files.length === 0) {
            alert('请您先选择要上传的文件~~');
            return;
        }
        changeDisable(true);
        // 循环发送请求
        let upload_list_arr = Array.from(upload_list.querySelectorAll('li'));
        _files = _files.map(item => {
            let fm = new FormData,
                curLi = upload_list_arr.find(liBox => liBox.getAttribute('key') === item.key),
                curSpan = curLi ? curLi.querySelector('span:nth-last-child(1)') : null;
            fm.append('file', item.file);
            fm.append('filename', item.filename);
            return instance.post('/upload_single', fm, {
                onUploadProgress(ev) {
                    // 检测每一个的上传进度
                    if (curSpan) {
                        curSpan.innerHTML = `${(ev.loaded/ev.total*100).toFixed(2)}%`;
                    }
                }
            }).then(data => {
                if (+data.code === 0) {
                    if (curSpan) {
                        curSpan.innerHTML = `100%`;
                    }
                    return;
                }
                return Promise.reject();
            });
        });

        // 等待所有处理的结果
        Promise.all(_files).then(() => {
            alert('恭喜您，所有文件都上传成功~~');
        }).catch(() => {
            alert('很遗憾，上传过程中出现问题，请您稍后再试~~');
        }).finally(() => {
            changeDisable(false);
            _files = [];
            upload_list.innerHTML = '';
            upload_list.style.display = 'none';
        });
    });

    // 基于事件委托实现移除的操作
    upload_list.addEventListener('click', function (ev) {
        let target = ev.target,
            curLi = null,
            key;
        if (target.tagName === 'EM') {
            curLi = target.parentNode.parentNode;
            if (!curLi) return;
            upload_list.removeChild(curLi);
            key = curLi.getAttribute('key');
            _files = _files.filter(item => item.key !== key);
            if (_files.length === 0) {
                upload_list.style.display = 'none';
            }
        }
    });

    // 获取唯一值
    const createRandom = () => {
        let ran = Math.random() * new Date();
        return ran.toString(16).replace('.', '');
    };
    upload_inp.addEventListener('change', async function () {
        _files = Array.from(upload_inp.files);
        if (_files.length === 0) return;
        // 我们重构集合的数据结构「给每一项设置一个位置值，作为自定义属性存储到元素上，后期点击删除按钮的时候，我们基于这个自定义属性获取唯一值，再到集合中根据这个唯一值，删除集合中这一项」
        _files = _files.map(file => {
            return {
                file,
                filename: file.name,
                key: createRandom()
            };
        });
        // 绑定数据
        let str = ``;
        _files.forEach((item, index) => {
            str += `<li key="${item.key}">
                <span>文件${index+1}：${item.filename}</span>
                <span><em>移除</em></span>
            </li>`;
        });
        upload_list.innerHTML = str;
        upload_list.style.display = 'block';
    });

    upload_button_select.addEventListener('click', function () {
        if (checkIsDisable(this)) return;
        upload_inp.click();
    });
})();

/* 拖拽上传 */
(function () {
    let upload = document.querySelector('#upload6'),
        upload_inp = upload.querySelector('.upload_inp'),
        upload_submit = upload.querySelector('.upload_submit'),
        upload_mark = upload.querySelector('.upload_mark');
    let isRun = false;

    // 实现文件上传
    const uploadFile = async file => {
        if (isRun) return;
        isRun = true;
        upload_mark.style.display = 'block';
        try {
            let fm = new FormData,
                data;
            fm.append('file', file);
            fm.append('filename', file.name);
            data = await instance.post('/upload_single', fm);
            if (+data.code === 0) {
                alert(`恭喜您，文件上传成功，您可以基于 ${data.servicePath} 访问该文件~~`);
                return;
            }
            throw data.codeText;
        } catch (err) {
            alert(`很遗憾，文件上传失败，请您稍后再试~~`);
        } finally {
            upload_mark.style.display = 'none';
            isRun = false;
        }
    };

    // 拖拽获取 dragenter dragleave dragover drop
    /* upload.addEventListener('dragenter', function () {
        console.log('进入');
    });
    upload.addEventListener('dragleave', function () {
        console.log('离开');
    }); */
    upload.addEventListener('dragover', function (ev) {
        ev.preventDefault();
    });
    upload.addEventListener('drop', function (ev) {
        ev.preventDefault();
        let file = ev.dataTransfer.files[0];
        if (!file) return;
        uploadFile(file);
    });

    // 手动选择
    upload_inp.addEventListener('change', function () {
        let file = upload_inp.files[0];
        if (!file) return;
        uploadFile(file);
    });
    upload_submit.addEventListener('click', function () {
        upload_inp.click();
    });
})();

/* 大文件上传 */
(function () {
    let upload = document.querySelector('#upload7'),
        upload_inp = upload.querySelector('.upload_inp'),
        upload_button_select = upload.querySelector('.upload_button.select'),
        upload_progress = upload.querySelector('.upload_progress'),
        upload_progress_value = upload_progress.querySelector('.value');

    const checkIsDisable = element => {
        let classList = element.classList;
        return classList.contains('disable') || classList.contains('loading');
    };

    const changeBuffer = file => {
        return new Promise(resolve => {
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = ev => {
                let buffer = ev.target.result,
                    spark = new SparkMD5.ArrayBuffer(),
                    HASH,
                    suffix;
                spark.append(buffer);
                HASH = spark.end();
                suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
                resolve({
                    buffer,
                    HASH,
                    suffix,
                    filename: `${HASH}.${suffix}`
                });
            };
        });
    };

    upload_inp.addEventListener('change', async function () {
        let file = upload_inp.files[0];
        if (!file) return;
        upload_button_select.classList.add('loading');
        upload_progress.style.display = 'block';

        // 获取文件的HASH
        let already = [],
            data = null,
            {
                HASH,
                suffix
            } = await changeBuffer(file);

        // 获取已经上传的切片信息
        try {
            data = await instance.get('/upload_already', {
                params: {
                    HASH
                }
            });
            if (+data.code === 0) {
                already = data.fileList;
            }
        } catch (err) {}

        // 实现文件切片处理 「固定数量 & 固定大小」
        let max = 1024 * 100,
            count = Math.ceil(file.size / max),
            index = 0,
            chunks = [];
        if (count > 100) {
            max = file.size / 100;
            count = 100;
        }
        while (index < count) {
            chunks.push({
                file: file.slice(index * max, (index + 1) * max),
                filename: `${HASH}_${index+1}.${suffix}`
            });
            index++;
        }

        // 上传成功的处理
        index = 0;
        const clear = () => {
            upload_button_select.classList.remove('loading');
            upload_progress.style.display = 'none';
            upload_progress_value.style.width = '0%';
        };
        const complate = async () => {
            // 管控进度条
            index++;
            upload_progress_value.style.width = `${index/count*100}%`;

            // 当所有切片都上传成功，我们合并切片
            if (index < count) return;
            upload_progress_value.style.width = `100%`;
            try {
                data = await instance.post('/upload_merge', {
                    HASH,
                    count
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                if (+data.code === 0) {
                    alert(`恭喜您，文件上传成功，您可以基于 ${data.servicePath} 访问该文件~~`);
                    clear();
                    return;
                }
                throw data.codeText;
            } catch (err) {
                alert('切片合并失败，请您稍后再试~~');
                clear();
            }
        };

        // 把每一个切片都上传到服务器上
        chunks.forEach(chunk => {
            // 已经上传的无需在上传
            if (already.length > 0 && already.includes(chunk.filename)) {
                complate();
                return;
            }
            let fm = new FormData;
            fm.append('file', chunk.file);
            fm.append('filename', chunk.filename);
            instance.post('/upload_chunk', fm).then(data => {
                if (+data.code === 0) {
                    complate();
                    return;
                }
                return Promise.reject(data.codeText);
            }).catch(() => {
                alert('当前切片上传失败，请您稍后再试~~');
                clear();
            });
        });
    });

    upload_button_select.addEventListener('click', function () {
        if (checkIsDisable(this)) return;
        upload_inp.click();
    });
})();