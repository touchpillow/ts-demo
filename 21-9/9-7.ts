import * as a from "./mpck.json";
namespace N906 {
  // let a;
  // a = 1;
  // function lookupHeadphonesManufacturer(color: "blue" | "black") {
  //   // Function lacks ending return statement and return type does not include 'undefined'.
  //   if (color === "blue") {
  //     return "beats";
  //   }
  // }

  // class Album {
  //   setup() {}
  // }

  // class MLAlbum extends Album {
  //   override setup() {}
  // }

  // class SharedAlbum extends Album {
  //  override setup() {}
  // // This member must have an 'override' modifier because it overrides a member in the base class 'Album'.
  // }

  class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }

    getAreaFunction() {
      return function () {
        return this.width * this.height;
        // 'this' implicitly has type 'any' because it does not have a type annotation.
        // 'this' implicitly has type 'any' because it does not have a type annotation.
      };
    }
  }

  // interface A {
  //   a: string;
  //   [key: string]: string;
  // }
  // let a: A = { a: "" };
  // const b = a.b; //属性“b”来自索引签名，因此必须使用[“b”]访问它

  interface B {
    a: string;
    [K: string]: string;
  }
  let b: B = { a: "" };
  const v = b["name"]; //类型为string|undefiend

  const createKeyboard = (modelID: number) => {
    const defaultModelID = 23;
    // 'defaultModelID' is declared but its value is never read.
    return { type: "keyboard", modelID };
  };
}
