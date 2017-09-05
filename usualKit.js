//检测属性是否在原型中
function hasPrototypeProperty(objct, name) {
    return !objct.hasOwnProperty(name) && (name in objct);
}

//寄生组合式继承

/**
 * Example
 * function Person(name, age) {
 *   this.name = name;
 *   this.age = age;
 * }
 *
 * Person.prototype.eat = function() {
 *   console.log(this.name + 'have dinner');
 * };
 *
 * function Teacher() {
 *   Person.call(this, arguments);
 * }
 *
 * Teacher.prototype.skill = function() {
 *   console.log('teacher'); 
 * };
 *
 * inheritPrototype(Teacher, Person);
 * 
 */
function inheritPrototype(subtype, supertype) {
    // var prototype = supertype.prototype; 貌似一样
    var prototype = Object(supertype.prototype);
    prototype.constructor = subtype;
    subtype.prototype = prototype;
}

//阻止冒泡事件
function cancelEvent(e) {
    if (e) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}


/**
 * 检查字符串是否以xx开头
 * 
 * @param {String} origin 被检验的字符串
 * @param {String} text  待检验的字符串
 * @returns 
 */
function isStartWith(origin, text) {
    if (origin.startsWith) {
        return origin.startsWith(text);
    } else {
        var count = text.length;
        var length = origin.length;
        if (length < count) {
            return;
        }
        if (count) {
            for (var i = 0; i < count; i++) {
                if (origin[i] != text[i]) {
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }
}

/**
 * 扩展对象
 * 
 * @param {any} origin 待扩展对象
 * @param {any} dest 被扩展对象
 * @returns 
 */
function extend(origin, dest) {
    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (origin[key]) {
                dest[key] = origin[key];
            }
        }
    }
    return dest;
}