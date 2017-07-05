//检测属性是否在原型中
function hasPrototypeProperty(objct, name) {
    return !objct.hasOwnProperty(name) && (name in objct);
}
