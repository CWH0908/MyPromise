const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function _dealThenReturn(thenPromise, thenCallBack, resolve, reject) {
  if (thenPromise === thenCallBack) {
    return reject(new TypeError('循环调用'))
  }
  if (thenCallBack instanceof MyPromise) {
    thenCallBack.then(resolve,reject);
  } else {
    resolve(thenCallBack)
  }
}

class MyPromise {
  // 构造函数传入执行函数 executor，内含两个回调函数，resolve和reject
  constructor(executor) {
    // 捕获执行器中抛出的错误
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error);
    }
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

  then(onFulfilled, onRejected) {
    // 默认回调
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    };

    const thenPromise = new MyPromise((resolve, reject) => {
      queueFulfilledTask = () => {
        queueMicrotask(_ => {
          try {
            const fulfilledCallBack = onFulfilled(this.value);
            _dealThenReturn(thenPromise, fulfilledCallBack, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      queueRejectedTask = () => {
        queueMicrotask(_ => {
          try {
            const rejectedCallBack = onRejected(this.reason);
            _dealThenReturn(thenPromise, rejectedCallBack, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (status === FULFILLED) {
        queueFulfilledTask();
      }
      if (status === REJECTED) {
        queueRejectedTask();
      }
      if (status === PENDING) {
        this.onFulfilledCallBack.push(queueFulfilledTask);
        this.onRejectedCallBack.push(queueRejectedTask);
      }

    });

    return thenPromise;
  }

  static resolve(callBack) {
    return new Promise(resolve => {
      resolve(callBack);
    })
  }

  static reject(callBack) {
    return new Promise((resolve, reject) => {
      reject(callBack);
    })
  }
}

// promiseA+ 规范检测，拓展安装 cnpm install promises-aplus-tests -D
MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

// export default MyPromise;
module.exports = MyPromise