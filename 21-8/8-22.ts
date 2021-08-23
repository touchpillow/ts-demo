namespace N822 {
  interface A {
    a: string;
    b?: string;
  }
  interface B {
    a: string;
    b: string;
  }
  //   let a: A = {
  //     a: "",
  //     b: "",
  //   };
  let b: B = {
    a: "",
    b: "",
  };
  type TA = string | number;
  type TB = boolean | string;
  type TC = boolean | RegExp;
  //   a = b;
  //   b = a;
  function fn(a: TA, b: TB, c: TC) {
    let n: number = 1;
    let s: string = "";
    // s = a as string;
    // a = s;
    c = a as string as TB as boolean;
  }
  //   a = "";
  const str: JSONString<B> = JSON.stringify(b);
}
