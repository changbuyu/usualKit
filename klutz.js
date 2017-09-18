! function(window) {
    function $$() {};
    $$.prototype = {


        extendMany: function() {
            var k, i = 0,
                len = arguments.length,
                target = null,
                copy;
            if (len === 0) {
                return;
            } else if (len === 1) {
                target = this;
            } else {
                i++;
                target = arguments[0];
            }
            for (; i < len; i++) {
                for (key in arguments[i]) {
                    copy = arguments[i][key];
                    target[key] = copy;
                }
            }
            return target;
        },
        extend: function(target, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
    }

    $$ = new $$();

    /*Basic*/
    $$.extend($$, {

    })

    /*Ajax*/
    $$.extend($$, {
        ajax: function(para) {
            if (!para.url) { //没有url
                throw new Error('there is no url available')
            }

            if (para.success && typeof para.success != 'function') {
                throw new Error('success is not a function')
            }

            if (para.error && typeof para.error != 'function') {
                throw new Error('error is not a function')
            }

            var xhr = createXHR();
            if (!para.method || pare.method.toLowerCase() == 'get') { //没有方法 默认get
                xhr.open('GET', para.url);
            } else if (para.method.toLowerCase() == 'post') {
                xhr.open('POST', para.url);
            }

            //扩展其它设置,http头等.
            if (para.header) { //{'Content-Type':'text/plain'}
                for (var key in para.header) {
                    if ((para.header).hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, para.header[key]);
                    }
                }
            }

            //超时
            if (para.timeout) {
                var timeout = parseInt(para.timeout);
                if (!isNaN(timeout)) {
                    xhr.timeout = timeout;
                }
            }

            if (para.data) {
                xhr.send(para.data);
            } else {
                xhr.send();
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 3) { //loading

                } else if (xhr.readyState == 4) { //done
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        para.success(JSON.parse(xhr.responeText || xhr.responseXML))
                    } else {
                        para.error(xhr.status, xhr.statusText);
                    }
                }
            }


            function createXHR() {
                if (typeof XMLHttpRequest != 'undefined') {
                    return new XMLHttpRequest();
                } else if (typeof ActiveXObject != 'undefined') {
                    if (typeof arguments.callee.activeXString != 'string') {
                        var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                            i, len;
                        for (var i = 0, len = versions.length; i < len; i++) {
                            try {
                                new ActiveXObject(versions[i]);
                                arguments.callee.activeXString = versions[i];
                                break;
                            } catch (ex) {

                            }
                        }
                    }
                    return new ActiveXObject(arguments.callee.activeXString);
                } else {
                    return new Error('No XHR object available.')
                }
            }
        },
        get: function(url, success, error) {
            this.ajax({
                url: url,
                success: success,
                error: error
            });
        },
        post: function() {

        },
        jsonp: function(url, data, callback) {
            var funcName = 'jsonp_callback_' + (new Date()).getTime();
            var query = url.indexOf('?') == -1 ? '?' : '&';
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    query += key + '=' + data[key] + '&';
                }
            }
            query += 'callback=' + funcName;
            var script = document.createElement('script');
            window[funcName] = function(resp) {
                callback(resp);
                document.body.removeChild(script);
                window[funcName] = null;
            }
            script.setAttribute('src', url + query);
            document.body.appendChild(script);
        }
    });

    /*DOM*/
    $$.extend($$, {
        id: function(id) {
            if ($$.isString(id)) {
                return document.getElementById(id);
            }
        },
        tag: function(tag) {
            if ($$.isString(tah)) {
                return document.getElementsByTagName(tag);
            }
        },
        class: function(className) {
            if ($$.isString(className)) {
                if (document.getElementsByClassName) {
                    return document.getElementsByClassName(className);
                } else {
                    throw new Error('Your Browser do not support this method');
                }
            }
        }
    });

    /*Event*/
    $$.extend($$, {
        on: function(id, type, fn) {
            var dom = $$.isString(id) ? document.getElementById(id) : id;
            if (dom.addEventListener) {
                dom.addEventListener(type, fn);
            } else if (dom.attachEvent) {
                dom.attachEvent('on' + type, fn);
            }
        },
        un: function(id, type, fn) {
            var dom = $$.isString(id) ? document.getElementById(id) : id;
            if (dom.removeEventListener) {
                dom.removeEventListener(type, fn);
            } else if (dom.detachEvent) {
                dom.detachEvent(type, fn);
            }
        },
        click: function(id, fn) {
            $$.on(id, 'click', fn);
        },
        mouseover: function(id, fn) {
            $$.on(id, 'mouseover', fn);
        },
        mouseout: function(id, fn) {
            $$.on(id, 'mouseout', fn);
        },
        hover: function(id, fnOver, fnOut) {
            if (fnOver && typeof fnOver === 'function') {
                $$.on(id, 'mouseover', fnOver);
            }
            if (fnOut && typeof fnOut === 'function') {
                $$.on(id, 'mouseout', fnOut);
            }
        }
    });

    /*CSS*/
    $$.extend($$, {

    });

    /*Type of*/
    $$.extend($$, {
        isNumber: function(num) {
            return typeof num == 'number' && isFinite(num);
        },
        isString: function(val) {
            return typeof val === 'string';
        },
        isObject: function(obj) {
            if (obj === null || typeof obj === 'undefiened') {
                return false;
            }
            return typeof obj === 'object';
        },
        isArray: function(arr) {
            if (arr === null || typeof arr === 'undefiened') {
                return false;
            }
            return typeof arr === 'object' && arr.constructor === Array;
        }
    });

    /*String*/
    $$.extend($$, {
        filePath: function() {
            var url = '';
            if (document.currentScript) {
                url = document.currentScript.src;
            } else {
                var scripts = document.getElementsByTagName('script');
                var script = scripts[scripts.length - 1];

                if (script.getAttribute.length !== undefined) {
                    url = script.src;
                } else {
                    url = script.getAttribute('src', '-1');
                }

            }
            return url.split('/').pop();
        },
        ltrim: function(str) {
            if (typeof str == 'string') {
                return str.replace(/^\s+/g, '');
            } else {
                throw new Error(str + ' is not string');
            }
        },
        rtrim: function(str) {
            if (typeof str == 'string') {
                return str.replace(/\s+$/g, '');
            } else {
                throw new Error(str + ' is not string');
            }
        },
        trim: function(str) {
            if (typeof str == 'string') {
                return str.replace(/^\s+|\s+$/g, '');
            } else {
                throw new Error(str + ' is not string');
            }
        }
    });

    /*Number*/
    $$.extend($$, {
        random: function(start, end) {
            return Math.floor(Math.random() * (end - begin)) + begin
        }
    });

    /*Timer*/
    $$.extend($$, {
        stamp: function() {
            return (new Date()).getTime();
        },
        //fmt: 'yyyy-MM-dd HH:mm:ss' '-,:' can be different
        formatter: function(time, fmt) {
            if ($$.isString(fmt)) {
                var date = new Date(time);
                var arr = fmt.split(' ');
                var dateStr = '';
                var dsep = '',
                    tsep = '';
                if (arr.length > 1) { //有日期及时间
                    var fmtDate = arr[0];
                    var fmtTime = arr[1];
                    if (fmtDate.indexOf('yyyy') != -1) { //有年,并且有后续
                        if (fmtDate.length > 4) {
                            dsep = fmtDate.slice(4, 5);
                        }
                        dateStr += date.getFullYear();
                        if (fmtDate.indexOf('MM') != -1) { //有月
                            dateStr += dsep + (date.getMonth() + 1);
                        } else { //没有月,直接返回年份 over
                            return dateStr;
                        }
                        if (fmtDate.indexOf('dd') != -1) { //有日
                            dateStr += dsep + date.getDate();
                        } else {
                            return dateStr;
                        }
                    } else {
                        if (fmtDate.indexOf('MM') != -1) { //有月
                            if (fmtDate.length > 2) {
                                dsep = fmtDate.slice(2, 3);
                            }
                            dateStr += (date.getMonth() + 1);
                        }
                        if (fmtDate.indexOf('dd') != -1) { //有日
                            dateStr += dsep + date.getDate();
                        } else {
                            return dateStr;
                        }
                    }

                    if (dateStr.length) {
                        if (fmtTime.indexOf('HH') != -1) {
                            if (fmtTime.length > 2) {
                                tsep = fmtTime.slice(2, 3);
                            }
                            dateStr += ' ' + date.getHours();
                        } else {
                            return dateStr;
                        }
                        if (fmt.indexOf('mm') != -1) {
                            dateStr += tsep + date.getMinutes();
                        } else {
                            return dateStr;
                        }
                        if (fmt.indexOf('ss') != -1) {
                            dateStr += tsep + date.getSeconds();
                        } else {
                            return dateStr;
                        }
                    } else {
                        if (fmtTime.indexOf('HH') != -1) {
                            if (fmtTime.length > 2) {
                                tsep = fmtTime.slice(2, 3);
                            }
                            dateStr += date.getHours();
                        } else {
                            return dateStr;
                        }

                        if (fmt.indexOf('mm') != -1) {
                            dateStr += tsep + date.getMinutes();
                        } else {
                            return dateStr;
                        }

                        if (fmt.indexOf('ss') != -1) {
                            dateStr += tsep + date.getSeconds();
                        } else {
                            return dateStr;
                        }
                    }
                    return dateStr;
                } else { //有日期或时间
                    if (fmt.indexOf('yyyy') != -1) { //有年,并且有后续
                        if (fmt.length > 4) {
                            dsep = fmt.slice(4, 5);
                        }
                        dateStr += date.getFullYear();
                        if (fmt.indexOf('MM') != -1) { //有月
                            dateStr += dsep + (date.getMonth() + 1);
                        } else { //没有月,直接返回年份 over
                            return dateStr;
                        }
                        if (fmt.indexOf('dd') != -1) { //有日
                            dateStr += dsep + date.getDate();
                        } else {
                            return dateStr;
                        }
                    } else {
                        if (fmt.indexOf('MM') != -1) { //有月
                            if (fmt.length > 2) {
                                dsep = fmt.slice(2, 3);
                            }
                            dateStr += (date.getMonth() + 1);
                        }
                        if (fmt.indexOf('dd') != -1) { //有日
                            dateStr += dsep + date.getDate();
                        }
                    }

                    if (fmt.indexOf('HH') != -1) {
                        if (fmt.length > 2) {
                            tsep = fmt.slice(2, 3);
                        }
                        dateStr += date.getHours();
                        if (fmt.indexOf('mm') != -1) {
                            dateStr += tsep + date.getMinutes();
                        } else {
                            return dateStr;
                        }

                        if (fmt.indexOf('ss') != -1) {
                            dateStr += tsep + date.getSeconds();
                        } else {
                            return dateStr;
                        }
                    } else {
                        if (fmt.indexOf('mm') != -1) {
                            if (fmt.length > 2) {
                                tsep = fmt.slice(2, 3);
                            }
                            dateStr += date.getMinutes();
                        }

                        if (fmt.indexOf('ss') != -1) {
                            dateStr += tsep + date.getSeconds();
                        } else {
                            return dateStr;
                        }
                    }
                    return dateStr;
                }
            } else {
                return new Date(time);
            }
        }
    });


    window.$$ = $$;
}(window)