// 验证数据类型方法
const isType = type => obj => Object.prototype.toString.call(obj).match(/\[object ([a-zA-Z]*)\]/)[1] === type;

export { isType }