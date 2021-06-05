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

  onFulfilledCallBack = null; // 存储成功后的回调

  onRejectedCallBack = null; // 存储失败后的回调

  // 定义resolve回调函数，使用箭头函数，保证回调里面使用的this指向本实例对象
  resolve = (value) => {
    // 当前状态是pending才能改为fulfilled
    if (this.status === PENDING) {
      this.status = FULFILLED; // 修改状态
      this.value = value; // 保存成功的返回值
      this.onFulfilledCallBack && this.onFulfilledCallBack(this.value); // resolve时若有存储回调函数则执行
    }
  }

  // 定义reject回调函数
  reject = (reason) => {
    // 当前状态是pending才能改为rejected
    if (this.status === PENDING) {
      this.status = REJECTED; // 修改状态
      this.reason = reason; // 保存失败原因
      this.onRejectedCallBack && this.onRejectedCallBack(this.reason); // rejected时若有存储回调函数则执行
    }
  }

  // 定义then回调函数
  then(onFulfilled, onRejected) {
    // 状态成功 - 用保存的成功的返回值 执行传入的成功回调
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    // 状态失败 - 用保存的失败的原因 执行传入的失败回调
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    // 调用then时处于异步pending中，将回调函数存起来
    if (this.status === PENDING) {
      this.onFulfilledCallBack = onFulfilled;
      this.onRejectedCallBack = onRejected;
    }
  }
}

export default MyPromise;