import React from "react";
import MyPromise_V1 from "./MyPromise/MyPromise_V1";
import MyPromise_V2 from "./MyPromise/MyPromise_V2";
import MyPromise_V3 from "./MyPromise/MyPromise_V3";
import MyPromise_V4 from "./MyPromise/MyPromise_V4";
import MyPromise_V5 from "./MyPromise/MyPromise_V5";

const page = (props) => {
  // V1 promise基础逻辑     ********************************************************************
  const v1 = new MyPromise_V1((resolve, reject) => {
    resolve("success");
    reject("err");
  });
  v1.then(
    (value) => {
      console.log(" =========== V1 =============");
      console.log("基础 resolve", value);
    },
    (reason) => {
      console.log("reject", reason);
    }
  );

  // V2 加入等待异步事件的能力 ********************************************************************
  const v2 = new MyPromise_V2((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 2000);
  });

  v2.then((value) => {
    console.log(" =========== V2 =============");
    console.log("异步 resolve", value);
  });

  // V3 支持执行多个then功能 ********************************************************************
  const v3 = new MyPromise_V3((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 2000);
  });

  v3.then((value) => {
    console.log(" =========== V3 =============");
    console.log("多个 resolve 1", value);
  });

  v3.then((value) => {
    console.log(" =========== V3 =============");
    console.log("多个 resolve 2", value);
  });

  // V4 支持then的链式调用 ********************************************************************
  const v4 = new MyPromise_V4((resolve, reject) => {
    // setTimeout(() => { 
    //   resolve("success");
    // }, 2000);
    resolve("success"); // 此版本由于未定义异步的 then调用，因此先使用同步
  });

  v4.then((value) => {
    console.log(" =========== V4 =============");
    console.log("支持then的链式调用 1", value);
    return new MyPromise_V4((resolve, reject) => {
      resolve("第二个");
    });
  }).then((value) => {
    console.log(" =========== V4 =============");
    console.log("支持then的链式调用 2", value);
  });

  return <div>cwh-dev</div>;
};

export default page;