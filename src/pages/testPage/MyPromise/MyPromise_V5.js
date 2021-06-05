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

  onFulfilledCallBack = []; // 存储成功后的回调 - 数组

  onRejectedCallBack = []; // 存储失败后的回调 - 数组

  // 定义resolve回调函数，使用箭头函数，保证回调里面使用的this指向本实例对象
  resolve = (value) => {
    // 当前状态是pending才能改为fulfilled
    if (this.status === PENDING) {
      this.status = FULFILLED; // 修改状态
      this.value = value; // 保存成功的返回值
      // resolve时将存储的回调函数数组全部执行
      while (this.onFulfilledCallBack.length) {
        this.onFulfilledCallBack.shift()(this.value)
      }
    }
  }

  // 定义reject回调函数
  reject = (reason) => {
    // 当前状态是pending才能改为rejected
    if (this.status === PENDING) {
      this.status = REJECTED; // 修改状态
      this.reason = reason; // 保存失败原因
      // rejected时将存储的回调函数数组全部执行
      while (this.onRejectedCallBack.length) {
        this.onRejectedCallBack.shift()(this.reason)
      }
    }
  }

  // 定义then回调函数
  then(onFulfilled, onRejected) {
    const thenPromise = new Promise((resolve, rejected) => {
      // 状态成功 - 用保存的成功的返回值 执行传入的成功回调
      if (this.status === FULFILLED) {
        // 由于需要使用thenPromise，添加到微任务执行，等到thenPromise创建后再使用
        window.queueMicrotask(_ => {
          const fulfilledReturn = onFulfilled(this.value);
          resolvePromise(thenPromise, fulfilledReturn, resolve, rejected);
        })
      }
      // 状态失败 - 用保存的失败的原因 执行传入的失败回调
      if (this.status === REJECTED) {
        onRejected(this.reason)
      }
      // 调用then时处于异步pending中，将回调函数存起来
      if (this.status === PENDING) {
        this.onFulfilledCallBack.push(onFulfilled);
        this.onRejectedCallBack.push(onRejected);
      }
    })
    return thenPromise;
  }
}

// 定义处理then回调的函数
function resolvePromise(thenPromise, fulfilledReturn, resolve, reject) {
  if (thenPromise === fulfilledReturn) {
    // 返回自身，循环调用，报错
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // then回调返回的是新的promise
  if (fulfilledReturn instanceof MyPromise) {
    fulfilledReturn.then(resolve, reject)
  } else {
    // then回调返回的是普通值，直接resolve
    resolve(fulfilledReturn);
  }
}

export default MyPromise;