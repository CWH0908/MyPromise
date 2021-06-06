import React from "react";
import MyPromise_V1 from "./MyPromise/MyPromise_V1";
import MyPromise_V2 from "./MyPromise/MyPromise_V2";
import MyPromise_V3 from "./MyPromise/MyPromise_V3";
import MyPromise_V4 from "./MyPromise/MyPromise_V4";
import MyPromise_V5 from "./MyPromise/MyPromise_V5";
import MyPromise_V6 from "./MyPromise/MyPromise_V6";
import MyPromise_V7 from "./MyPromise/MyPromise_V7";
import MyPromise_V8 from "./MyPromise/MyPromise_V8";
import MyPromise_V9 from "./MyPromise/MyPromise_V9";
import MyPromise_expand from "./MyPromise/MyPromise_expand";

const page = (props) => {
  // // V1 promise基础逻辑     ********************************************************************
  // const v1 = new MyPromise_V1((resolve, reject) => {
  //   resolve("success");
  //   reject("err");
  // });
  // v1.then(
  //   (value) => {
  //     console.log(" =========== V1 =============");
  //     console.log("基础 resolve", value);
  //   },
  //   (reason) => {
  //     console.log("reject", reason);
  //   }
  // );

  // // V2 加入等待异步事件的能力 ********************************************************************
  // const v2 = new MyPromise_V2((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("success");
  //   }, 2000);
  // });

  // v2.then((value) => {
  //   console.log(" =========== V2 =============");
  //   console.log("异步 resolve", value);
  // });

  // // V3 支持执行多个then功能 ********************************************************************
  // const v3 = new MyPromise_V3((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("success");
  //   }, 2000);
  // });

  // v3.then((value) => {
  //   console.log(" =========== V3 =============");
  //   console.log("多个 resolve 1", value);
  // });

  // v3.then((value) => {
  //   console.log(" =========== V3 =============");
  //   console.log("多个 resolve 2", value);
  // });

  // // V4 支持then的链式调用 ********************************************************************
  // const v4 = new MyPromise_V4((resolve, reject) => {
  //   // setTimeout(() => {
  //   //   resolve("success");
  //   // }, 2000);
  //   resolve("success"); // 此版本由于未定义异步的 then调用，因此先使用同步
  // });

  // v4.then((value) => {
  //   console.log(" =========== V4 =============");
  //   console.log("支持then的链式调用 1", value);
  //   return new MyPromise_V4((resolve, reject) => {
  //     resolve("第二个");
  //   });
  // }).then((value) => {
  //   console.log(" =========== V4 =============");
  //   console.log("支持then的链式调用 2", value);
  // });

  // // V5 支持自身调用then防循环嵌套 ********************************************************************
  // const v5 = new MyPromise_V5((resolve, reject) => {
  //   // setTimeout(() => {
  //   //   resolve("success");
  //   // }, 2000);
  //   resolve("success"); // 此版本由于未定义异步的 then调用，因此先使用同步
  // });

  // const v5Then = v5.then((value) => {
  //   console.log(" =========== V5 =============");
  //   console.log("支持then的链式调用 1", value);
  //   return v5Then; // 返回自身，需要防止循环调用
  // });
  // v5Then.then((value) => {
  //   console.log(" =========== V5 =============");
  //   console.log("支持then的链式调用 2", value);
  // });

  // // V6 支持 捕获创建promise时执行器里抛出的错误和捕获then抛出的错误 ********************************************************************
  // const v6 = new MyPromise_V6((resolve, reject) => {
  //   // throw new Error("我在这执行报错啦!");
  //   resolve("success");
  // });

  // v6.then(
  //   (value) => {
  //     console.log(" =========== V6 =============");
  //     console.log("resolve:", value);
  //     throw new Error('then抛出错误')
  //   },
  //   (reason) => {
  //     console.log(" =========== V6 =============");
  //     console.log(reason);
  //   }
  // ).then(
  //   (value) => {
  //     console.log(" =========== V6 =============");
  //     console.log("resolve:", value);
  //   },
  //   (reason) => {
  //     console.log(" =========== V6 =============");
  //     console.log(reason);
  //   }
  // );

  // // V7 补充fulfilled外两种状态的链式调用和捕获错误 ********************************************************************
  // const v7 = new MyPromise_V7((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("success");
  //   }, 1000);
  // });

  // v7.then(
  //   (value) => {
  //     console.log(" =========== V7 =============");
  //     console.log("resolve:", value);
  //     return 'success2'
  //   },
  //   (reason) => {
  //     console.log(" =========== V7 =============");
  //     console.log(reason);
  //   }
  // ).then(
  //   (value) => {
  //     console.log(" =========== V7 =============");
  //     console.log("resolve:", value);
  //   },
  //   (reason) => {
  //     console.log(" =========== V7 =============");
  //     console.log(reason);
  //   }
  // );

  // // V8 补充then的空参调用 ********************************************************************
  // const v8 = new MyPromise_V8((resolve, reject) => {
  //   setTimeout(() => {
  //   console.log(" =========== V8 =============");
  //     // resolve("success");
  //     reject("fail");
  //   }, 1000);
  // });
  // v8.then()
  //   .then()
  //   .then(
  //     (value) => console.log(value),
  //     (reason) => console.log(reason)
  //   );

  // // V9 拓展resolve和reject的静态调用 ********************************************************************
  // MyPromise_V9.resolve()
  //   .then(() => {
  //     console.log(" =========== V9 =============");
  //     return MyPromise_V9.resolve("success");
  //   })
  //   .then((res) => {
  //     console.log("res:", res);
  //   });

  // //  支持 promise.all ****************************************************************************************
  // MyPromise_expand.all([
  //   MyPromise_expand.resolve(1),
  //   MyPromise_expand.resolve(2),
  //   MyPromise_expand.resolve(3),
  //   MyPromise_expand.reject('fail'),
  // ]).then((res) => {
  //   console.log("res:", res);
  // });

  //  支持 promise.race ****************************************************************************************
  MyPromise_expand.race([
    new MyPromise_expand((resolve) => {
      setTimeout(() => {
        resolve(111);
      }, 1000);
    }),
    MyPromise_expand.resolve(222),
    MyPromise_expand.resolve(333),
    MyPromise_expand.reject("fail"),
  ]).then((res) => {
    console.log("res:", res);
  });

  return <div>MyPromise</div>;
};

export default page;
