namespace N821 {
  export interface A {
    a: string;
  }
  export interface B {
    a: number;
    b: number;
  }
  let a: A = {
    a: "",
  };
  let b: B = {
    a: 1,
    b: 1,
  };
  export declare function aaa(a: A): string;
  export declare function aaa(a: B): number;
  // export function aaa(v: A) {
  //   return "";
  // }
  const v = aaa(a);
  const vb = aaa(b);

  function aaaa<T>(params: T[], s: T) {
    return params[0];
  }
  const vc = aaaa([1, 2, 3], "");
}

export default N821;
