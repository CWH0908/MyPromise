// 定义状态常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  // 构造函数传入执行函数 executor，内含两个回调函数，resolve和reject
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  status = PENDING; // 初始化状态为pending

  value = null; // 成功后的返回值

  reason = null; // 失败后的原因

  // 定义resolve回调函数，使用箭头函数，保证回调里面使用的this指向本实例对象
  resolve = (value) => {
    // 当前状态是pending才能改为fulfilled
    if(this.status === PENDING){
      this.status = FULFILLED; // 修改状态
      this.value = value; // 保存成功的返回值
    }
  }

  // 定义reject回调函数
  reject = (reason) => {
    // 当前状态是pending才能改为rejected
    if(this.status === PENDING){
      this.status = REJECTED; // 修改状态
      this.reason = reason; // 保存失败原因
    }
  }

  // 定义then回调函数
  then(onFulfilled,onRejected){
    // 状态成功 - 用保存的成功的返回值 执行传入的成功回调
    if(this.status === FULFILLED){
      onFulfilled(this.value)
    }
    // 状态失败 - 用保存的失败的原因 执行传入的失败回调
    if(this.status === REJECTED){
      onRejected(this.reason)
    }
  }
}

export default MyPromise;