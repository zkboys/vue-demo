/**
 * 获取滚动条宽度
 * @returns {number}
 */
export function getScrollBarWidth() {
    let scrollDiv = document.createElement('div');
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';
    document.body.appendChild(scrollDiv);
    let scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    window.document.body.removeChild(scrollDiv);
    return scrollBarWidth;
}
/**
 *  获取/设置 指定元素css属性
 * @param el
 * @param cssName
 * @param value
 * @returns {*}
 */
export function css(el, cssName, value) {
    if (arguments.length === 2) {
        let len = arguments.length;
        let sty;
        let f;
        let fv;
        'currentStyle' in el ? sty = el.currentStyle : 'getComputedStyle' in window ? sty = window.getComputedStyle(el, null) : null;
        if (cssName === 'opacity' && document.all) {
            f = el.filters;
            f && f.length > 0 && f.alpha ? fv = f.alpha.opacity / 100 : fv = 1;
            return fv;
        }
        cssName === 'float' ? document.all ? cssName = 'styleFloat' : cssName = 'cssFloat' : cssName;
        sty = (len === 2) ? sty[cssName] : sty;
        return sty;
    }

    if (arguments.length === 3) {
        el.style[cssName] = value;
    }
}

export function addListener(el, type, listener, useCapture) {
    if (window.addEventListener) {
        el.addEventListener(type, listener, useCapture);
        return listener;
    }
    if (window.attachEvent) {
        // 标准化this，event，target
        const wrapper = function () {
            const event = window.event;
            // noinspection JSAnnotator
            event.target = event.srcElement;
            listener.call(el, event);
        };
        el.attachEvent('on' + type, wrapper);
        return wrapper;
    }
}
/**
 * 根据指定的key，value，获取树状结构中某个节点
 * @param data
 * @param key
 * @param value
 */
export function findNode(data, key, value, nodes = []) {
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const v = node[key];
            if (v === value) {
                nodes.push(node);
                return nodes;
            }
            const children = node.children;
            if (children && children.length) {
                nodes.push(node);
                const child = findNode(children, key, value, nodes);
                if (child) {
                    return child;
                }
            }
        }
    } else {
        const v = data[key];
        if (v === value) {
            nodes.push(data);
            return nodes;
        }
    }
}
