! function(w) { //仅针对ipv4;
    var netKit = {};
    netKit.prototype = {
        /**
         * 检测mac地址是否合法
         * 
         * @param {any} mac mac地址
         * @param {any} full 是否即时检验,默认false, 为即时检验
         */
        isMac = function(mac, full) {
            ///^[0-9A-Fa-f]{0,12}$/
            if (typeof mac == 'string') {
                if (full) {
                    return !!mac.match(/^[0-9A-Fa-f]{12}$/);
                } else {
                    return !!mac.match(/^[0-9A-Fa-f]{0,12}$/);
                }
            } else {
                return false;
            }
        },

        /**
         * 检测ip/dns地址是否合法
         * 
         * @param {String} ip 
         */
        isIp = function(ip) {
            ///^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
            if (typeof ip == 'string') {
                return !!ip.match(/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/);
            } else {
                return false;
            }
        },

        /**
         * 检查子网掩码是否合法
         * 
         * @param {any} netMask 
         */
        isNetMask = function(netMask) {
            if (typeof netMask == 'string') {
                var arr = netMask.split('.');
                if (arr.length < 4 || arr.length > 4) {
                    return false;
                }
                var integer = 0;
                for (var i = 0; i < 4; i++) {
                    if (arr[i].length < 0 || !(/^\d+$/).test(arr[i]) || arr[i] > 255) {
                        return false;
                    }
                    integer >>>= 8;
                    integer += arr[i];
                }
                var flag = 1;
                while (integer > 0) {
                    if (integer % 2 != 0) {
                        flag = 0;
                    } else {
                        if (flag == 0) {
                            return false;
                        }
                    }
                    integer >>>= 1;
                }
                return true;
            } else {
                return false;
            }
        }
    }
}(window)