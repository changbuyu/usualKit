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