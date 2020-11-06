 /**
 * 用原生 JS 封装一个 Toast 组件
 * @param msg 文本内容
 * @param type 类型  success error  loading
 * @param duration 持续时间
 */
export function toast(e) {
    // 如果 e 的类型为 string，设置e.msg= e
    if (typeof e == 'string') {
        e = { msg: e }
    }
    if (!e.msg) {
        console.error('text 不能为空!');
        return;
    }
    var m = document.createElement('div');
    m.id = 'toastId'; // 设置id，一个页面有且仅有一个Toast
    // m.setAttribute('class', 'toast');   // 设置类名
    m.classList.add('toast', 'in');
    switch (e.type) {
        case 'success':
            m.innerHTML = `<i class="iconfont icon-success"></i><p class="text">${e.msg}</p>`;
            break;
        case 'error':
            m.innerHTML = `<i class="iconfont icon-error"></i><p class="text">${e.msg}</p>`;
            break;
        case 'loading':
            m.innerHTML = `<i class="iconfont icon-loading"></i><p class="text">${e.msg}</p>`;
            break;
        default:
            m.innerHTML = `<p class="text">${e.msg}</p>`;
            break;
    }
    var toastId = document.getElementById('toastId');

    // 判断当前页面没有 id=toastId 就插入
    if (toastId == null) {
        document.body.appendChild(m);
        toastId = document.getElementById('toastId');
        toastId.classList.add('in');

        // 设置定时器
        var hideTimeOut = setTimeout(() => {
            toastId.classList.remove('in');
            clearInterval(hideTimeOut)   // 清除 TimeOut
            document.body.removeChild(m)
        }, e.time || 2e3);
    }
}